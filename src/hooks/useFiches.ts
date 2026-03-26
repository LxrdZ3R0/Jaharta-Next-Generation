"use client";
import { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  serverTimestamp,
} from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import { compressImage } from "@/lib/helpers";
import type { Fiche } from "@/lib/types";

export function useFiches(isAdmin: boolean) {
  const [fiches, setFiches] = useState<Fiche[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "fiches"),
      (snap) => {
        const docs: Fiche[] = [];
        snap.forEach((d) => docs.push({ id: d.id, ...d.data() } as Fiche));

        // Filter: show validated, or all if admin
        const visible = docs.filter(
          (d) => d.status === "validee" || (isAdmin && d.status)
        );

        // Sort by createdAt desc
        visible.sort((a, b) => {
          const ta =
            a.createdAt?.toMillis?.() ??
            (a.syncedAt ? new Date(a.syncedAt).getTime() : 0);
          const tb =
            b.createdAt?.toMillis?.() ??
            (b.syncedAt ? new Date(b.syncedAt).getTime() : 0);
          return tb - ta;
        });

        setFiches(visible);
        setLoading(false);
      },
      (err) => {
        console.error("[Fiches]", err.code, err.message);
        setLoading(false);
      }
    );

    return unsub;
  }, [isAdmin]);

  /** Upload a photo file or return URL directly */
  async function uploadPhoto(
    file: File | null,
    urlFallback: string
  ): Promise<string> {
    if (!file) return urlFallback;
    try {
      const compressed = await compressImage(file);
      const path = `photos/${Date.now()}_${file.name.replace(/\.[^.]+$/, ".jpg")}`;
      const snap = await uploadBytes(ref(storage, path), compressed);
      return await getDownloadURL(snap.ref);
    } catch (e) {
      console.warn("Photo upload:", e);
      return urlFallback;
    }
  }

  /** Upload a generic file and return its URL */
  async function uploadFile(file: File): Promise<string> {
    const path = `fiches/${Date.now()}_${file.name}`;
    const snap = await uploadBytes(ref(storage, path), file);
    return await getDownloadURL(snap.ref);
  }

  /** Create a new fiche */
  async function addFiche(
    data: Omit<Fiche, "id" | "createdAt">,
    photoFile: File | null
  ) {
    const photoUrl = await uploadPhoto(photoFile, data.photoUrl || "");
    await addDoc(collection(db, "fiches"), {
      ...data,
      photoUrl,
      status: "validee",
      createdAt: serverTimestamp(),
    });
  }

  /** Update an existing fiche */
  async function updateFiche(
    id: string,
    data: Partial<Omit<Fiche, "id">>,
    photoFile: File | null
  ) {
    const photoUrl = await uploadPhoto(photoFile, data.photoUrl || "");
    await updateDoc(doc(db, "fiches", id), {
      ...data,
      photoUrl,
      updatedAt: new Date(),
    });
  }

  /** Delete a fiche */
  async function deleteFiche(id: string) {
    await deleteDoc(doc(db, "fiches", id));
  }

  /** Get a single fiche by ID (for editing) */
  async function getFiche(id: string): Promise<Fiche | null> {
    const snap = await getDoc(doc(db, "fiches", id));
    if (!snap.exists()) return null;
    return { id: snap.id, ...snap.data() } as Fiche;
  }

  return {
    fiches,
    loading,
    addFiche,
    updateFiche,
    deleteFiche,
    getFiche,
    uploadFile,
  };
}

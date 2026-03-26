"use client";
import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RACES_SPECIFIC } from "@/lib/constants";
import { sanitize } from "@/lib/helpers";
import type { Fiche, FicheStats, Power, FicheLink } from "@/lib/types";
import { EMPTY_STATS } from "@/lib/types";

/* ─── Types ─── */
interface ModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (
    data: Omit<Fiche, "id" | "createdAt">,
    photoFile: File | null
  ) => Promise<void>;
  onUpdate?: (
    id: string,
    data: Partial<Omit<Fiche, "id">>,
    photoFile: File | null
  ) => Promise<void>;
  uploadFile?: (file: File) => Promise<string>;
  editData?: Fiche | null;
}

/* ─── Subcomponents ─── */
function Label({ children, req }: { children: React.ReactNode; req?: boolean }) {
  return (
    <label className="mb-1 block font-heading text-[0.56rem] uppercase tracking-[0.2em] text-white/30">
      {children}
      {req && <span className="text-magenta"> *</span>}
    </label>
  );
}

function Input(props: React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      className="w-full rounded-sm border border-cyan/[0.16] bg-cyan/[0.03] px-3 py-2.5 font-heading text-[0.9rem] text-white/80 outline-none transition-all focus:border-cyan focus:shadow-[0_0_10px_rgba(0,240,255,0.08)]"
    />
  );
}

function Select({
  children,
  ...props
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      {...props}
      className="w-full rounded-sm border border-cyan/[0.16] bg-cyan/[0.03] px-3 py-2.5 font-heading text-[0.9rem] text-white/80 outline-none transition-all focus:border-cyan [&>option]:bg-jaharta-dark"
    >
      {children}
    </select>
  );
}

function Textarea(props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      {...props}
      className="w-full resize-y rounded-sm border border-cyan/[0.16] bg-cyan/[0.03] px-3 py-2.5 font-heading text-[0.9rem] text-white/80 outline-none transition-all focus:border-cyan"
      style={{ minHeight: 72 }}
    />
  );
}

/* ─── Main Modal ─── */
export function FicheModal({
  open,
  onClose,
  onSubmit,
  onUpdate,
  uploadFile,
  editData,
}: ModalProps) {
  const isEdit = !!editData;

  // Form state
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [age, setAge] = useState("");
  const [race, setRace] = useState("");
  const [raceSpecific, setRaceSpecific] = useState("");
  const [rank, setRank] = useState("");
  const [desc, setDesc] = useState("");
  const [discord, setDiscord] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [stats, setStats] = useState<FicheStats>({ ...EMPTY_STATS });
  const [powers, setPowers] = useState<Power[]>([]);
  const [urlLinks, setUrlLinks] = useState<{ label: string; url: string }[]>([
    { label: "Fiche", url: "" },
  ]);
  const [photoFile, setPhotoFile] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fileRef = useRef<HTMLInputElement>(null);

  // Populate when editing
  useEffect(() => {
    if (!open) return;
    if (editData) {
      setFirstname(editData.firstname || "");
      setLastname(editData.lastname || "");
      setAge(editData.age || "");
      setRace(editData.race || "");
      setRaceSpecific(editData.raceSpecific || "");
      setRank(editData.rank || "");
      setDesc(editData.desc || editData.bio || "");
      setDiscord(editData.discord || "");
      setPhotoUrl(editData.photoUrl || "");
      setPhotoPreview(editData.photoUrl || "");
      setStats({ ...EMPTY_STATS, ...(editData.stats || {}) });
      setPowers(editData.powers || []);
      const existingLinks =
        editData.links ||
        (editData.linkUrl
          ? [{ t: "Fiche", h: editData.linkUrl }]
          : []);
      setUrlLinks(
        existingLinks.length > 0
          ? existingLinks.map((l) => ({ label: l.t, url: l.h }))
          : [{ label: "Fiche", url: "" }]
      );
      setPhotoFile(null);
    } else {
      // Reset for new
      setFirstname("");
      setLastname("");
      setAge("");
      setRace("");
      setRaceSpecific("");
      setRank("");
      setDesc("");
      setDiscord("");
      setPhotoUrl("");
      setPhotoPreview("");
      setStats({ ...EMPTY_STATS });
      setPowers([]);
      setUrlLinks([{ label: "Fiche", url: "" }]);
      setPhotoFile(null);
    }
    setError("");
    setSubmitting(false);
  }, [open, editData]);

  // Race specific options
  const raceOptions = race ? RACES_SPECIFIC[race] || [] : [];

  // Photo handling
  const handlePhotoFile = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const f = e.target.files?.[0];
      if (!f) return;
      setPhotoFile(f);
      setPhotoUrl("");
      const reader = new FileReader();
      reader.onload = (ev) => setPhotoPreview(ev.target?.result as string);
      reader.readAsDataURL(f);
    },
    []
  );

  const handlePhotoUrl = useCallback((url: string) => {
    setPhotoUrl(url);
    setPhotoFile(null);
    setPhotoPreview(url);
    if (fileRef.current) fileRef.current.value = "";
  }, []);

  // Stat change
  const setStat = (key: keyof FicheStats, val: number) => {
    setStats((prev) => ({ ...prev, [key]: Math.min(9999, Math.max(0, val)) }));
  };

  // Powers
  const addPower = () => setPowers((p) => [...p, { name: "", desc: "" }]);
  const removePower = (i: number) =>
    setPowers((p) => p.filter((_, idx) => idx !== i));
  const updatePower = (i: number, field: "name" | "desc", val: string) =>
    setPowers((p) => p.map((pw, idx) => (idx === i ? { ...pw, [field]: val } : pw)));

  // Links
  const addLink = () =>
    setUrlLinks((l) => [...l, { label: "Fiche", url: "" }]);
  const removeLink = (i: number) =>
    setUrlLinks((l) => l.filter((_, idx) => idx !== i));
  const updateLink = (i: number, field: "label" | "url", val: string) =>
    setUrlLinks((l) =>
      l.map((lk, idx) => (idx === i ? { ...lk, [field]: val } : lk))
    );

  // Submit
  const handleSubmit = async () => {
    const fn = sanitize(firstname);
    const ln = sanitize(lastname);
    if (!fn || !ln || !race || !rank || !desc) {
      setError("Remplissez tous les champs obligatoires (*)");
      return;
    }
    if (!isEdit && !discord.trim()) {
      setError("Le pseudo Discord est requis");
      return;
    }

    setSubmitting(true);
    setError("");

    const links: FicheLink[] = urlLinks
      .filter((l) => l.url.trim())
      .map((l) => ({ t: l.label.trim() || "Fiche", h: l.url.trim() }));

    const data: Omit<Fiche, "id" | "createdAt"> = {
      firstname: fn,
      lastname: ln,
      age: sanitize(age),
      race,
      raceSpecific,
      rank,
      desc: sanitize(desc),
      discord: sanitize(discord),
      photoUrl: photoFile ? "" : photoUrl,
      stats,
      powers: powers.filter((p) => p.name.trim()),
      links,
      linkUrl: links[0]?.h || "",
      status: "validee",
    };

    try {
      if (isEdit && editData && onUpdate) {
        await onUpdate(editData.id, data, photoFile);
      } else {
        await onSubmit(data, photoFile);
      }
      onClose();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Erreur inconnue";
      setError("⚠ " + msg);
    }
    setSubmitting(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[1000] flex items-start justify-center overflow-y-auto bg-jaharta-deep/95 p-4 backdrop-blur-sm md:p-8"
          onClick={(e) => {
            if (e.target === e.currentTarget) onClose();
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.28 }}
            className="relative my-auto w-full max-w-[580px] overflow-hidden rounded-md border border-cyan/[0.16] bg-jaharta-dark"
          >
            {/* Top accent */}
            <div className="h-[3px] bg-gradient-to-r from-cyan to-magenta" />

            {/* Close */}
            <button
              onClick={onClose}
              className="absolute right-4 top-4 flex h-7 w-7 items-center justify-center rounded-sm border border-cyan/[0.16] text-[0.85rem] text-white/30 transition-all hover:border-magenta hover:text-magenta"
            >
              ✕
            </button>

            <div className="p-7">
              <h2 className="mb-6 font-display text-[0.82rem] font-bold uppercase tracking-[0.25em] text-cyan">
                {isEdit ? "// Modifier la fiche" : "// Ajouter un Personnage"}
              </h2>

              {/* Row: Prénom + Nom */}
              <div className="mb-3 grid grid-cols-2 gap-3">
                <div>
                  <Label req>Prénom</Label>
                  <Input
                    placeholder="Ex: Vexara"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                  />
                </div>
                <div>
                  <Label req>Nom</Label>
                  <Input
                    placeholder="Ex: NISHI"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                  />
                </div>
              </div>

              {/* Age */}
              <div className="mb-3">
                <Label>Âge</Label>
                <Input
                  placeholder="Ex: 23 ans, Inconnu…"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                />
              </div>

              {/* Race group + Specific + Rank */}
              <div className="mb-3 grid grid-cols-3 gap-3">
                <div>
                  <Label req>Groupe de Race</Label>
                  <Select
                    value={race}
                    onChange={(e) => {
                      setRace(e.target.value);
                      setRaceSpecific("");
                    }}
                  >
                    <option value="">— Choisir —</option>
                    <option value="Humanoids">Humanoids</option>
                    <option value="Zooids">Zooids</option>
                    <option value="MythZooids">Mythical Zooids</option>
                    <option value="Demons">Demons</option>
                    <option value="Artificial">Artificial</option>
                    <option value="Semi-Liquid">Semi-Liquid</option>
                    <option value="Undead">Undead</option>
                  </Select>
                </div>
                <div>
                  <Label req>Race spécifique</Label>
                  <Select
                    value={raceSpecific}
                    onChange={(e) => setRaceSpecific(e.target.value)}
                    disabled={!race}
                  >
                    <option value="">
                      {race ? "— Choisir —" : "— Groupe d'abord —"}
                    </option>
                    {raceOptions.map((r) => (
                      <option key={r} value={r}>
                        {r}
                      </option>
                    ))}
                  </Select>
                </div>
                <div>
                  <Label req>Rang</Label>
                  <Select
                    value={rank}
                    onChange={(e) => setRank(e.target.value)}
                  >
                    <option value="">— Choisir —</option>
                    {[
                      ["F", "Faible"],
                      ["E", "Commun"],
                      ["D", "Ordinaire"],
                      ["C", "Élevé"],
                      ["B", "Avancé"],
                      ["A", "Élite"],
                      ["S", "Héroïque"],
                      ["SS", "Légendaire"],
                      ["SSS", "Mythique"],
                      ["X", "Transcendant"],
                      ["T", "Divin"],
                      ["G", "Cosmique"],
                      ["G+", "Éternel"],
                      ["Z", "Absolu"],
                    ].map(([k, v]) => (
                      <option key={k} value={k}>
                        {k} — {v}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              {/* Photo */}
              <div className="mb-3">
                <Label>Photo du personnage</Label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className="relative flex h-[100px] cursor-pointer items-center justify-center overflow-hidden rounded-sm border border-dashed border-cyan/[0.16] bg-cyan/[0.03] transition-all hover:border-cyan"
                >
                  {photoPreview && (
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  )}
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoFile}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  {!photoPreview && (
                    <div className="pointer-events-none text-center font-heading text-[0.58rem] tracking-[0.12em] text-white/25">
                      <div className="mb-1 text-xl opacity-30">⬆</div>
                      Cliquer pour uploader une image
                    </div>
                  )}
                </div>
                <Input
                  placeholder="Ou URL d'image : https://..."
                  value={photoUrl}
                  onChange={(e) => handlePhotoUrl(e.target.value)}
                  className="mt-2"
                  style={{ marginTop: 7 }}
                />
              </div>

              {/* Description */}
              <div className="mb-3">
                <Label req>Description courte</Label>
                <Textarea
                  placeholder="2-3 phrases résumant votre personnage..."
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                />
              </div>

              {/* Links */}
              <div className="mb-3">
                <Label>
                  Liens{" "}
                  <span className="text-[0.5rem] opacity-50">
                    — ajoutez autant de fiches que nécessaire
                  </span>
                </Label>
                <div className="flex flex-col gap-2">
                  {urlLinks.map((l, i) => (
                    <div key={i} className="flex items-center gap-1.5">
                      <Input
                        placeholder="Libellé"
                        value={l.label}
                        onChange={(e) => updateLink(i, "label", e.target.value)}
                        style={{ width: 120, flexShrink: 0 }}
                      />
                      <Input
                        placeholder="https://..."
                        value={l.url}
                        onChange={(e) => updateLink(i, "url", e.target.value)}
                      />
                      <button
                        onClick={() => removeLink(i)}
                        className="shrink-0 rounded-sm border border-magenta/30 bg-magenta/10 px-2.5 py-1.5 text-[0.8rem] text-magenta transition-all hover:bg-magenta/20"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addLink}
                  className="mt-2 w-full rounded-sm border border-cyan/[0.22] bg-cyan/[0.06] px-3.5 py-2 font-heading text-[0.58rem] tracking-[0.12em] text-cyan transition-all hover:bg-cyan/[0.12]"
                >
                  + Ajouter un lien URL
                </button>
              </div>

              {/* Stats */}
              <div className="mb-3">
                <Label>
                  Statistiques{" "}
                  <span className="text-[0.55rem] opacity-50">
                    — de 0 à 9999 · AURA cachée si 0
                  </span>
                </Label>
                <div className="grid grid-cols-4 gap-2.5 md:grid-cols-4">
                  {(
                    [
                      ["str", "STRENGTH", "#ff6060"],
                      ["agi", "AGILITY", "#44ff88"],
                      ["spd", "SPEED", "#00f0ff"],
                      ["int", "INTELLIGENCE", "#60a5fa"],
                      ["mana", "MANA", "#b06eff"],
                      ["res", "RESISTANCE", "#fbbf24"],
                      ["cha", "CHARISMA", "#f97316"],
                      ["aura", "AURA", "#e040fb"],
                    ] as [keyof FicheStats, string, string][]
                  ).map(([k, label, color]) => (
                    <div key={k}>
                      <label
                        className="mb-1 block font-heading text-[0.5rem] uppercase tracking-[0.1em]"
                        style={{ color }}
                      >
                        {label}
                      </label>
                      <input
                        type="number"
                        min={0}
                        max={9999}
                        value={stats[k]}
                        onChange={(e) =>
                          setStat(k, parseInt(e.target.value) || 0)
                        }
                        className="w-full rounded-sm border border-cyan/[0.16] bg-cyan/[0.03] px-3 py-2 font-heading text-[0.9rem] text-white/80 outline-none transition-all focus:border-cyan"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Powers */}
              <div className="mb-3">
                <Label>
                  Pouvoirs{" "}
                  <span className="text-[0.55rem] opacity-50">
                    — nom + description optionnelle
                  </span>
                </Label>
                <div className="flex flex-col gap-2">
                  {powers.map((pw, i) => (
                    <div key={i} className="flex items-start gap-1.5">
                      <Input
                        placeholder="Nom du pouvoir"
                        value={pw.name}
                        onChange={(e) => updatePower(i, "name", e.target.value)}
                        style={{ flex: 1, minWidth: 0 }}
                      />
                      <textarea
                        placeholder="Description..."
                        value={pw.desc}
                        onChange={(e) => updatePower(i, "desc", e.target.value)}
                        className="w-full flex-[2] resize-y rounded-sm border border-cyan/[0.16] bg-cyan/[0.03] px-3 py-2 font-heading text-[0.9rem] text-white/80 outline-none transition-all focus:border-cyan"
                        style={{ minHeight: 42 }}
                      />
                      <button
                        onClick={() => removePower(i)}
                        className="shrink-0 rounded-sm border border-magenta/30 bg-magenta/[0.12] px-2.5 py-1.5 text-[0.8rem] text-magenta"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                </div>
                <button
                  onClick={addPower}
                  className="mt-2 w-full rounded-sm border border-cyan/[0.22] bg-cyan/[0.06] px-3.5 py-2 font-heading text-[0.58rem] tracking-[0.12em] text-cyan transition-all hover:bg-cyan/[0.12]"
                >
                  + Ajouter un pouvoir
                </button>
              </div>

              {/* Discord */}
              {!isEdit && (
                <div className="mb-4">
                  <Label req>Pseudo Discord</Label>
                  <Input
                    placeholder="Ex: username"
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                  />
                </div>
              )}

              {/* Error */}
              {error && (
                <p className="mb-3 font-heading text-[0.62rem] tracking-[0.1em] text-red-400">
                  {error}
                </p>
              )}

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="mt-1 w-full rounded-sm bg-gradient-to-r from-cyan to-emerald-200 py-3.5 font-display text-[0.68rem] font-bold uppercase tracking-[0.22em] text-jaharta-deep shadow-[0_0_12px_rgba(0,240,255,0.2)] transition-all hover:bg-white hover:shadow-[0_0_24px_rgba(0,240,255,0.3)] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {submitting
                  ? "⟳ Envoi en cours..."
                  : isEdit
                  ? "✎ Mettre à jour"
                  : "▸ Ajouter la fiche"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

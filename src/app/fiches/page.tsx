"use client";
import { useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import { Navbar } from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/FooterSections";
import { SubPageHero } from "@/components/sections/SubPageHero";
import { PageTransition } from "@/components/ui/page-transition";
import { Reveal } from "@/components/ui/reveal";
import { ToastProvider, useToast } from "@/components/ui/toast";
import { useAuth } from "@/hooks/useAuth";
import { useFiches } from "@/hooks/useFiches";
import { FicheCard } from "@/components/fiches/FicheCard";
import { RankLegend, RaceFilter, RankFilter } from "@/components/fiches/FicheFilters";
import { FicheModal } from "@/components/fiches/FicheModal";
import type { Fiche } from "@/lib/types";

function FichesContent() {
  const { isAdmin } = useAuth();
  const {
    fiches,
    loading,
    addFiche,
    updateFiche,
    deleteFiche,
    getFiche,
    uploadFile,
  } = useFiches(isAdmin);
  const { showToast } = useToast();

  const [raceFilter, setRaceFilter] = useState("all");
  const [rankFilter, setRankFilter] = useState("all");
  const [modalOpen, setModalOpen] = useState(false);
  const [editData, setEditData] = useState<Fiche | null>(null);

  // Filtered fiches
  const filtered = useMemo(() => {
    return fiches.filter((f) => {
      const matchRace = raceFilter === "all" || f.race === raceFilter;
      const matchRank = rankFilter === "all" || f.rank === rankFilter;
      return matchRace && matchRank;
    });
  }, [fiches, raceFilter, rankFilter]);

  // Open modal for adding
  const openAdd = useCallback(() => {
    if (!isAdmin) {
      showToast("⚠ Connexion admin requise.", "error");
      return;
    }
    setEditData(null);
    setModalOpen(true);
  }, [isAdmin, showToast]);

  // Open modal for editing
  const openEdit = useCallback(
    async (id: string) => {
      if (!isAdmin) return;
      const data = await getFiche(id);
      if (data) {
        setEditData(data);
        setModalOpen(true);
      }
    },
    [isAdmin, getFiche]
  );

  // Delete handler
  const handleDelete = useCallback(
    async (id: string) => {
      if (!isAdmin) return;
      if (!confirm("Supprimer définitivement cette fiche ?")) return;
      try {
        await deleteFiche(id);
        showToast("Fiche supprimée.", "error");
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : "Erreur";
        showToast("⚠ " + msg, "error");
      }
    },
    [isAdmin, deleteFiche, showToast]
  );

  // Submit handler (new)
  const handleSubmit = useCallback(
    async (data: Omit<Fiche, "id" | "createdAt">, photoFile: File | null) => {
      await addFiche(data, photoFile);
      showToast("✓ Fiche ajoutée et publiée !", "success");
    },
    [addFiche, showToast]
  );

  // Update handler (edit)
  const handleUpdate = useCallback(
    async (
      id: string,
      data: Partial<Omit<Fiche, "id">>,
      photoFile: File | null
    ) => {
      await updateFiche(id, data, photoFile);
      showToast("✓ Fiche mise à jour !", "success");
    },
    [updateFiche, showToast]
  );

  return (
    <>
      <PageTransition />
      <Navbar />

      <main>
        <SubPageHero
          pretitle="Registre Officiel · Base de Données RP"
          title="FICHES PERSONNAGES"
          subtitle="Tous les personnages joueurs validés par les administrateurs Jaharta"
        >
          <div className="flex flex-wrap items-center justify-center gap-5">
            {/* Stats */}
            <div className="flex items-center gap-3 rounded border border-cyan/[0.12] bg-cyan/[0.03] px-6 py-3 backdrop-blur-sm">
              <span className="font-display text-xl font-extrabold text-cyan drop-shadow-[0_0_14px_rgba(0,240,255,0.4)]">
                {loading ? "–" : fiches.length}
              </span>
              <span className="font-heading text-[0.6rem] font-medium uppercase tracking-[0.15em] text-white/40">
                Personnages
              </span>
            </div>

            <div className="flex items-center gap-3 rounded border border-cyan/[0.12] bg-cyan/[0.03] px-6 py-3 backdrop-blur-sm">
              <span className="font-display text-xl font-extrabold text-cyan drop-shadow-[0_0_14px_rgba(0,240,255,0.4)]">
                <span className="mr-2 inline-block h-[5px] w-[5px] animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#00ff88]" />
                LIVE
              </span>
              <span className="font-heading text-[0.6rem] font-medium uppercase tracking-[0.15em] text-white/40">
                Statut
              </span>
            </div>

            {/* Add button (admin only) */}
            {isAdmin && (
              <button
                onClick={openAdd}
                className="rounded-sm bg-gradient-to-r from-cyan to-emerald-200 px-6 py-2.5 font-heading text-[0.75rem] font-semibold uppercase tracking-[0.12em] text-jaharta-deep transition-all hover:shadow-glow-md"
              >
                + Ajouter une fiche
              </button>
            )}
          </div>
        </SubPageHero>

        <div className="mx-auto max-w-[1380px] px-6 py-12 md:px-11">
          {/* Section heading */}
          <Reveal>
            <div className="mb-7 flex items-center gap-4">
              <span className="font-display text-[0.62rem] font-semibold tracking-[0.12em] text-cyan-dim">
                01 //
              </span>
              <h2 className="whitespace-nowrap font-display text-[clamp(0.75rem,2vw,0.95rem)] font-bold uppercase tracking-[0.2em] text-white/90">
                Registre des personnages
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan/[0.15] to-transparent" />
            </div>
          </Reveal>

          {/* Rank Legend */}
          <Reveal delay={0.1}>
            <RankLegend />
          </Reveal>

          {/* Filters */}
          <Reveal delay={0.15}>
            <RaceFilter
              active={raceFilter}
              onSelect={setRaceFilter}
              fiches={fiches}
            />
          </Reveal>
          <Reveal delay={0.2}>
            <RankFilter active={rankFilter} onSelect={setRankFilter} />
          </Reveal>

          {/* Card grid */}
          {loading ? (
            <div className="py-20 text-center font-heading text-[0.72rem] tracking-[0.16em] text-white/25">
              ⟳ Chargement des fiches depuis Firebase...
            </div>
          ) : fiches.length === 0 ? (
            <div className="py-20 text-center font-heading text-[0.72rem] tracking-[0.16em] text-white/25">
              ◈ Aucune fiche validée pour le moment.
              <br />
              <br />
              <span className="text-[0.65rem]">
                Soyez le premier à soumettre votre personnage !
              </span>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-20 text-center font-heading text-[0.72rem] tracking-[0.16em] text-white/25">
              ◈ Aucun personnage pour ces filtres.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-[22px] sm:grid-cols-2 lg:grid-cols-[repeat(auto-fill,minmax(295px,1fr))]">
              <AnimatePresence mode="popLayout">
                {filtered.map((f) => (
                  <FicheCard
                    key={f.id}
                    fiche={f}
                    isAdmin={isAdmin}
                    onEdit={openEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modal */}
      <FicheModal
        open={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditData(null);
        }}
        onSubmit={handleSubmit}
        onUpdate={handleUpdate}
        uploadFile={uploadFile}
        editData={editData}
      />
    </>
  );
}

export default function FichesPage() {
  return (
    <ToastProvider>
      <FichesContent />
    </ToastProvider>
  );
}

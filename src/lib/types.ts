import type { Timestamp } from "firebase/firestore";

export interface FicheStats {
  str: number;
  agi: number;
  spd: number;
  int: number;
  mana: number;
  res: number;
  cha: number;
  aura: number;
}

export interface Power {
  name: string;
  desc: string;
}

export interface FicheLink {
  t: string; // label
  h: string; // href
}

export interface Fiche {
  id: string;
  firstname: string;
  lastname: string;
  age?: string;
  race: string;
  raceSpecific?: string;
  rank: string;
  level?: number;
  desc?: string;
  bio?: string;
  discord?: string;
  photoUrl?: string;
  photo?: string;
  affinity?: string;
  stats?: Partial<FicheStats>;
  powers?: Power[];
  links?: FicheLink[];
  linkUrl?: string;
  linkType?: string;
  status?: string;
  createdAt?: Timestamp | null;
  syncedAt?: string;
  updatedAt?: Date | null;
}

export const EMPTY_STATS: FicheStats = {
  str: 0, agi: 0, spd: 0, int: 0, mana: 0, res: 0, cha: 0, aura: 0,
};

export const STAT_DEFS: { k: keyof FicheStats; lbl: string; color: string }[] = [
  { k: "str", lbl: "STR", color: "#ff6060" },
  { k: "agi", lbl: "AGI", color: "#44ff88" },
  { k: "spd", lbl: "SPD", color: "#00f0ff" },
  { k: "int", lbl: "INT", color: "#60a5fa" },
  { k: "mana", lbl: "MNA", color: "#b06eff" },
  { k: "res", lbl: "RES", color: "#fbbf24" },
  { k: "cha", lbl: "CHA", color: "#f97316" },
  { k: "aura", lbl: "AUR", color: "#e040fb" },
];

export const HIGH_RANKS = ["SSS", "X", "T", "G", "G+", "Z"];

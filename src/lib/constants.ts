export const RACES = {
  Humanoids: { color: "#00c8ff", label: "Humanoids" },
  Zooids: { color: "#44ff88", label: "Zooids" },
  MythZooids: { color: "#b06eff", label: "Mythical Zooids" },
  Demons: { color: "#ff3030", label: "Demons" },
  Artificial: { color: "#ffd60a", label: "Artificial" },
  "Semi-Liquid": { color: "#00e5cc", label: "Semi-Liquid" },
  Undead: { color: "#9a8cff", label: "Undead" },
} as const;

export const RANKS = {
  F: { color: "#6b7280", bg: "rgba(107,114,128,0.22)", level: 1 },
  E: { color: "#9ca3af", bg: "rgba(156,163,175,0.18)", level: 2 },
  D: { color: "#60a5fa", bg: "rgba(96,165,250,0.18)", level: 3 },
  C: { color: "#34d399", bg: "rgba(52,211,153,0.18)", level: 4 },
  B: { color: "#fbbf24", bg: "rgba(251,191,36,0.18)", level: 5 },
  A: { color: "#f97316", bg: "rgba(249,115,22,0.2)", level: 6 },
  S: { color: "#ef4444", bg: "rgba(239,68,68,0.2)", level: 7 },
  SS: { color: "#ff006e", bg: "rgba(255,0,110,0.2)", level: 8 },
  SSS: { color: "#ffd60a", bg: "rgba(255,214,10,0.16)", level: 9 },
  X: { color: "#e040fb", bg: "rgba(224,64,251,0.18)", level: 10 },
  T: { color: "#c0f0ff", bg: "rgba(192,240,255,0.14)", level: 11 },
  G: { color: "#ffe680", bg: "rgba(255,230,128,0.14)", level: 12 },
  "G+": { color: "#ffffff", bg: "rgba(255,255,255,0.18)", level: 13 },
  Z: { color: "#ff6060", bg: "rgba(255,96,96,0.16)", level: 14 },
} as const;

export const RACES_SPECIFIC: Record<string, string[]> = {
  Humanoids: ["Human", "Elf", "Vampire", "Dwarf", "Orc", "Oni"],
  Zooids: [
    "Neko", "Doggo", "Bunny", "Draph", "Lamia", "Cowie",
    "Kakuen", "Dormouse", "Jinko", "Gyoubu", "Xiongmao", "Siren", "Moth",
  ],
  MythZooids: [
    "Qilin", "Dragon", "Minotaur", "Hellhound", "Sphynx",
    "Phoenix", "Fenrir", "Unicorn", "Kitsune", "Salamander", "Hakutaku",
  ],
  Demons: ["Tiefling", "Succubus", "Devil"],
  Artificial: ["Android", "Shuma"],
  "Semi-Liquid": ["Slime", "Nureonago"],
  Undead: ["Jiangshi", "Joker"],
};

export type RaceKey = keyof typeof RACES;
export type RankKey = keyof typeof RANKS;

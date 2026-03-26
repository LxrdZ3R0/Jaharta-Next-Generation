# JAHARTA RP — Next.js + Tailwind + Aceternity UI

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS 3** (thème cyberpunk custom)
- **Framer Motion** (animations)
- **Aceternity UI** (composants : Sparkles, Spotlight, TextGenerate, CardHover, Reveal)
- **Firebase** (Auth, Firestore, Storage) — config prête, hooks React

## Structure du projet

```
src/
├── app/
│   ├── layout.tsx          # Layout racine (métadonnées, fonts, globals)
│   ├── globals.css         # Tailwind + styles cyberpunk (scanlines, noise)
│   ├── page.tsx            # Page d'accueil (complète)
│   ├── fiches/page.tsx     # Placeholder — à compléter
│   ├── pnj/page.tsx        # Placeholder — à compléter
│   ├── portail/page.tsx    # Placeholder — à compléter
│   ├── races/page.tsx      # Placeholder — à compléter
│   └── admin/page.tsx      # Placeholder — à compléter
├── components/
│   ├── ui/                 # Composants Aceternity adaptés
│   │   ├── sparkles.tsx    # Canvas particles (cyan + violet)
│   │   ├── spotlight.tsx   # SVG spotlight beam
│   │   ├── backgrounds.tsx # GridBackground, NoiseOverlay, ScanlineOverlay
│   │   ├── card-hover.tsx  # HoverBorderGradient card
│   │   ├── reveal.tsx      # Reveal, StaggerChildren, StaggerItem
│   │   ├── text-generate-effect.tsx
│   │   └── page-transition.tsx
│   └── sections/           # Sections de page
│       ├── Navbar.tsx      # Nav fixe avec scroll effect + mobile drawer
│       ├── HeroSection.tsx # Hero complet (particles, glitch, spotlight)
│       ├── LoreSection.tsx # Texte lore avec reveals
│       ├── MapSection.tsx  # Carte holographique
│       ├── FeaturesSection.tsx    # 4 feature cards
│       ├── NavCardsSection.tsx    # 3 navigation cards colorées
│       ├── SubPageHero.tsx        # Hero réutilisable pour sub-pages
│       └── FooterSections.tsx     # Discord banner, CTA final, footer
├── hooks/
│   └── useAuth.ts          # Hook Firebase Auth
├── lib/
│   ├── firebase.ts         # Config Firebase centralisée
│   ├── constants.ts        # RACES, RANKS, RACES_SPECIFIC typés
│   └── utils.ts            # cn() helper (clsx + tailwind-merge)
└── types/
    └── global.d.ts         # Déclarations globales
```

## Installation

```bash
npm install
npm run dev
```

Le site sera accessible sur `http://localhost:3000`.

## Ce qui est fait

- ✅ Page d'accueil complète (hero, lore, map, features, nav cards, Discord, CTA, footer)
- ✅ Composants Aceternity UI adaptés au thème cyberpunk
- ✅ Navigation avec routing Next.js (toutes les pages sont routées)
- ✅ Animations Framer Motion (scroll reveal, stagger, hover, glitch)
- ✅ Firebase configuré avec hook useAuth
- ✅ Toutes les constantes (races, ranks) typées en TypeScript
- ✅ Thème Tailwind complet (couleurs, fonts, keyframes, shadows)

## Ce qui reste à faire

- 🔲 Page Fiches RP (grille de cards, filtres par race/rang, modal CRUD)
- 🔲 Page PNJ (grille PNJ, filtres par catégorie, modal CRUD)
- 🔲 Page Portail (cards ressources)
- 🔲 Page Races (grille par groupe)
- 🔲 Page Admin (login, dashboard, gestion fiches/PNJ/logs)
- 🔲 Music player (composant global)

## Déploiement

Compatible **Vercel** (recommandé), **GitHub Pages** (avec `output: 'export'`), ou tout hébergeur Node.js.

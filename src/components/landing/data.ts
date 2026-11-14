export type Rank = {
  id: string;
  name: string;
  tier: string;
  min: number;
};

// Same thresholds as the Rangsystem screen in the app.
export const RANKS: Rank[] = [
  { id: "lifter", name: "Lifter", tier: "Lifter", min: 0 },
  { id: "grinder-3", name: "Grinder 3", tier: "Grinder", min: 1000 },
  { id: "grinder-2", name: "Grinder 2", tier: "Grinder", min: 2500 },
  { id: "grinder-1", name: "Grinder 1", tier: "Grinder", min: 4500 },
  { id: "competitor-3", name: "Competitor 3", tier: "Competitor", min: 7000 },
  { id: "competitor-2", name: "Competitor 2", tier: "Competitor", min: 10500 },
  { id: "competitor-1", name: "Competitor 1", tier: "Competitor", min: 15000 },
  { id: "champion-3", name: "Champion 3", tier: "Champion", min: 21000 },
  { id: "champion-2", name: "Champion 2", tier: "Champion", min: 28000 },
  { id: "champion-1", name: "Champion 1", tier: "Champion", min: 37000 },
  { id: "legend-3", name: "Legend 3", tier: "Legend", min: 48000 },
  { id: "legend-2", name: "Legend 2", tier: "Legend", min: 62000 },
  { id: "legend-1", name: "Legend 1", tier: "Legend", min: 78000 },
  { id: "bodybuilder", name: "Bodybuilder", tier: "Bodybuilder", min: 95000 },
  { id: "goat", name: "GOAT", tier: "GOAT", min: 145000 },
];

export type Tier = {
  name: string;
  min: number;
  glow: string;
};

export const TIERS: Tier[] = [
  { name: "Lifter", min: 0, glow: "#E9E2D8" },
  { name: "Grinder", min: 1000, glow: "#D0834A" },
  { name: "Competitor", min: 7000, glow: "#A9BCD6" },
  { name: "Champion", min: 21000, glow: "#E2B23C" },
  { name: "Legend", min: 48000, glow: "#7D8BFF" },
  { name: "Bodybuilder", min: 95000, glow: "#E7B04A" },
  { name: "GOAT", min: 145000, glow: "#FFC64D" },
];

export function tierOf(rank: Rank): Tier {
  for (let i = 0; i < TIERS.length; i++) {
    if (TIERS[i].name === rank.tier) return TIERS[i];
  }
  return TIERS[0];
}

export function formatNumber(value: number): string {
  return Math.round(value).toLocaleString("de-DE");
}

// Point values from services/points.ts in the app.
export const POINT_RULES = [
  { label: "Jeder Arbeitssatz", points: 1 },
  { label: "Training abgeschlossen", points: 10 },
  { label: "Je 500 kg Volumen", points: 2 },
  { label: "Mehr Gewicht als letztes Mal, pro Übung", points: 10 },
  { label: "Mehr Wiederholungen bei gleichem Gewicht, pro Übung", points: 5 },
  { label: "Neuer persönlicher Rekord", points: 25 },
];

export type Season = {
  id: string;
  name: string;
  screen: string;
  bg: string;
  ink: string;
  muted: string;
  accent: string;
  dark: boolean;
};

// Colors from constants/seasons.ts and constants/colors.ts in the app.
export const SEASONS: Season[] = [
  {
    id: "standard",
    name: "Standard",
    screen: "/screens/home-light.webp",
    bg: "#EDE8E3",
    ink: "#1A1A1A",
    muted: "#6B6B6B",
    accent: "#1A1A1A",
    dark: false,
  },
  {
    id: "dark",
    name: "Dark",
    screen: "/screens/home-dark.webp",
    bg: "#1A1A1A",
    ink: "#EDE8E3",
    muted: "#9A9A9A",
    accent: "#EDE8E3",
    dark: true,
  },
  {
    id: "easter",
    name: "Frühling",
    screen: "/screens/home-spring.webp",
    bg: "#F2F5EE",
    ink: "#1A1A1A",
    muted: "#62705E",
    accent: "#4E6B4A",
    dark: false,
  },
  {
    id: "summer",
    name: "Sommer",
    screen: "/screens/home-summer.webp",
    bg: "#FBF4E8",
    ink: "#1A1A1A",
    muted: "#6E6658",
    accent: "#0F5468",
    dark: false,
  },
  {
    id: "autumn",
    name: "Herbst",
    screen: "/screens/home-autumn.webp",
    bg: "#14100C",
    ink: "#F1E8DC",
    muted: "#A3978A",
    accent: "#DCA66B",
    dark: true,
  },
  {
    id: "halloween",
    name: "Halloween",
    screen: "/screens/home-halloween.webp",
    bg: "#EFE5DA",
    ink: "#1A1A1A",
    muted: "#6B6661",
    accent: "#2B1B3F",
    dark: false,
  },
  {
    id: "winter",
    name: "Winter",
    screen: "/screens/home-winter.webp",
    bg: "#0A101C",
    ink: "#E6ECF7",
    muted: "#8C97AB",
    accent: "#DCE8FF",
    dark: true,
  },
  {
    id: "newyear",
    name: "Neujahr",
    screen: "/screens/home-nye.webp",
    bg: "#0B0B0C",
    ink: "#F1EBDD",
    muted: "#9A958A",
    accent: "#E9D9A8",
    dark: true,
  },
];

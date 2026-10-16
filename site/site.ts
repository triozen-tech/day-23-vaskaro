import type { SiteMeta, Theme } from "@/lib/site";

export const meta: SiteMeta = {
  name: "Vaskaro",
  title: "Vaskaro — Mountain roads on a scroll wheel",
  description: "Vaskaro: three mountain motorcycles, gear and test rides. Concept website by Triozen Tech.",
  loaderText: "VASKARO",
  loader: false, // the site brings its own loader (site/components/Loader.tsx)
  cursor: false,
  record: { duration: 36 },
};

export const theme: Theme = {
  bg: "#101316",
  surface: "#1A1F24",
  text: "#EDE7DB",
  muted: "#b4afa5",
  accent: "#B8854A",
  accentText: "#101316",
  line: "rgba(237,231,219,.16)",
  fontDisplay: "'Gilda Display', serif",
  fontBody: "'Chivo Variable', system-ui, sans-serif",
  radius: 0,
};

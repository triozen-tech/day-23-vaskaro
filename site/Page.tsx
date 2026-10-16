import { preload } from "react-dom";
import { HERO_CLIPS } from "./content";
// @ts-expect-error font files import as a URL string (no type declaration for .woff2)
import gildaUrl from "@fontsource/gilda-display/files/gilda-display-latin-400-normal.woff2";
// @ts-expect-error same
import chivoUrl from "@fontsource-variable/chivo/files/chivo-latin-wght-normal.woff2";
import Loader from "./components/Loader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Models from "./components/Models";
import Gate from "./components/Gate";
import Engine from "./components/Engine";
import GearShop from "./components/GearShop";
import Roads from "./components/Roads";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import VCursor from "./components/VCursor";

export default function Page() {
  // the hero's first frame downloads next to the page code, not after it
  for (const f of [gildaUrl, chivoUrl]) preload(typeof f === "string" ? f : f.src, { as: "font", type: "font/woff2", crossOrigin: "anonymous" });
  preload(`${HERO_CLIPS[0]}/frame_0001.webp`, { as: "image", fetchPriority: "high" });
  return (
    <main>
      <Loader />
      <VCursor />
      <Nav />
      <Hero />
      <Models />
      <Gate />
      <Engine />
      <GearShop />
      <Roads />
      <Booking />
      <Footer />
    </main>
  );
}

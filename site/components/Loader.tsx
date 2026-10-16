"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { clipProgress, ensureClip } from "@/lib/frames";
import { loading } from "@/lib/loading";
import { HERO_CLIPS } from "../content";

/** Tells the hero (and anything else) the loader is opening: the hook types in, the arc draws. */
export const OPEN_EVENT = "vk:open";
export const hasOpened = () => typeof window !== "undefined" && (window as unknown as { __vkOpen?: boolean }).__vkOpen === true;

/**
 * Loader (I19 "Tracking breath", our variant): VASKARO opens its letter-spacing like a breath, closes onto the logo spacing,
 * a bronze hairline fills with the first hero frames, then the whole plate lifts away as ONE piece (no split) onto the hero.
 * About 1.2 s: lift starts at 0.75 s, ends 1.2 s (waits only if the first frames are late). Sets `data-loader` so ?record=1 starts its clock after it.
 */
export default function Loader() {
  const root = useRef<HTMLDivElement>(null);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const open = () => {
      (window as unknown as { __vkOpen?: boolean }).__vkOpen = true;
      window.dispatchEvent(new Event(OPEN_EVENT));
    };
    if (prefersReducedMotion()) {
      open();
      setGone(true);
      loading.markFinished();
      return;
    }
    const el = root.current!;
    const line = el.querySelector(".vk-ld-line i") as HTMLElement;
    ensureClip(HERO_CLIPS[0]);
    const minAt = performance.now() + 750;
    const tl = gsap.timeline();
    // the breath itself is CSS (.vk-ld-word, from the first paint, before any script runs); the hairline fills with the frames
    tl.fromTo(line, { scaleX: 0 }, { scaleX: 1, duration: 0.7, ease: "power1.inOut" }, 0.05);
    let lifted = false;
    const lift = () => {
      if (lifted) return;
      lifted = true;
      gsap.to(el, {
        yPercent: -100, duration: 0.45, ease: "power3.inOut",
        onStart: open,
        onComplete: () => { setGone(true); loading.markFinished(); },
      });
    };
    const poll = setInterval(() => {
      if (performance.now() >= minAt && clipProgress(HERO_CLIPS[0]) > 0.2) { clearInterval(poll); lift(); }
    }, 40);
    const hard = setTimeout(() => { clearInterval(poll); lift(); }, 7000);
    return () => { clearInterval(poll); clearTimeout(hard); tl.kill(); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} data-loader className="vk-ld" aria-hidden>
      <div className="vk-ld-word">VASKARO</div>
      <div className="vk-ld-line"><i /></div>
    </div>
  );
}

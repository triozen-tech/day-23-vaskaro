"use client";
import { useEffect } from "react";
import { prefersReducedMotion } from "@/lib/gsap";

export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const sm = (p: number, a: number, b: number) => { const t = clamp((p - a) / (b - a)); return t * t * (3 - 2 * t); };
export const isStatic = () => prefersReducedMotion();
/** Scroll progress 0..1 of a tall track holding a sticky pin. */
export const prog = (track: HTMLElement, pin = 900) => clamp(-track.getBoundingClientRect().top / Math.max(1, track.offsetHeight - pin));
/** Entry progress of a section: 0 when its top edge is at the bottom of the screen, 1 when it reaches the top. */
export const entry = (el: HTMLElement) => clamp(1 - el.getBoundingClientRect().top / 900);
/** A ridge-line (mountain) edge: 25 fixed heights in 0..1. */
export const RIDGE = [.55,.7,.42,.9,.62,1,.5,.78,.35,.66,.95,.58,.82,.4,.74,1,.6,.46,.88,.7,.38,.8,.52,.68,.5];
/** Piecewise smooth interpolation through keyframes [[p, v...], ...]. */
export function seg(p: number, k: number[][]) {
  for (let i = 0; i < k.length - 1; i++) {
    if (p <= k[i + 1][0]) { const t = sm(p, k[i][0], k[i + 1][0]); return k[i].slice(1).map((v, j) => lerp(v, k[i + 1][j + 1], t)); }
  }
  return k[k.length - 1].slice(1);
}
/** Runs `fn(now seconds)` every frame while `root` is within a screen of the viewport (a pure function of scroll + time). */
export function useFrame(root: React.RefObject<HTMLElement | null>, fn: (t: number, still: boolean) => void) {
  useEffect(() => {
    const still = isStatic();
    let raf = 0;
    const loop = () => {
      const el = root.current;
      if (el) {
        const r = el.getBoundingClientRect();
        if (still || (r.bottom > -900 && r.top < 1800)) fn(performance.now() / 1000, still);
      }
      if (!still) raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}

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
 * Loader (I-VK1 "Headlight", custom): a bronze dot lights at the left, a soft beam sweeps VASKARO (letters show only where it has touched),
 * then the beam widens until it floods the screen and the plate opens onto the hero. The sweep is CSS (--p, from the first paint);
 * the flood is one tween of --w. About 1.15 s: the flood starts at 0.75 s (waits only if the first frames are late). Sets `data-loader` so ?record=1 starts its clock after it.
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
    ensureClip(HERO_CLIPS[0]);
    const minAt = performance.now() + 750;
    let lifted = false;
    const lift = () => {
      if (lifted) return;
      lifted = true;
      open();
      const v = { w: 0 };
      gsap.to(v, {
        w: 1, duration: 0.4, ease: "power2.in",
        onUpdate: () => el.style.setProperty("--w", v.w.toFixed(4)),
        onComplete: () => { setGone(true); loading.markFinished(); },
      });
    };
    const poll = setInterval(() => {
      if (performance.now() >= minAt && clipProgress(HERO_CLIPS[0]) > 0.2) { clearInterval(poll); lift(); }
    }, 40);
    const hard = setTimeout(() => { clearInterval(poll); lift(); }, 7000);
    return () => { clearInterval(poll); clearTimeout(hard); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} data-loader className="vk-ld" aria-hidden>
      <div className="vk-ld-beam"><i /></div>
      <div className="vk-ld-word"><span>VASKARO</span></div>
      <div className="vk-ld-dot" />
    </div>
  );
}

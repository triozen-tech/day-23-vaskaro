"use client";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import { clipFrame, ensureClip, frameUrl, getManifest } from "@/lib/frames";
import { loading } from "@/lib/loading";
import { HERO_CLIPS } from "../content";

/** The loader's own CSS, inline so it paints with the first HTML (the site stylesheet can arrive seconds later on a slow link). */
const CSS = `/* LOADER · I-VK1 "Headlight" (custom, new): black screen, a bronze dot lights at the left, a soft beam sweeps the wordmark (letters show only where it has touched),
   then the beam widens into a hole that floods the screen. --p (sweep, CSS from first paint) and --w (flood, set by Loader.tsx) are the only two values. */
@property --p { syntax: '<number>'; inherits: true; initial-value: 0; }
@property --w { syntax: '<number>'; inherits: true; initial-value: 0; }
.vk-ld { position: fixed; inset: 0; z-index: 300; background: #000; overflow: hidden; animation: vkp .66s cubic-bezier(.4,0,.35,1) .1s forwards;
  -webkit-mask-image: radial-gradient(circle at 50% 50%, transparent calc(var(--w) * 1300px - 300px), #000 calc(var(--w) * 1300px)); mask-image: radial-gradient(circle at 50% 50%, transparent calc(var(--w) * 1300px - 300px), #000 calc(var(--w) * 1300px)); }
@keyframes vkp { to { --p: 1; } }
.vk-ld-dot { position: absolute; left: 96px; top: 450px; width: 12px; height: 12px; margin: -6px 0 0 -6px; border-radius: 50%; background: #E9B677; box-shadow: 0 0 24px 8px rgba(184,133,74,.75), 0 0 80px 24px rgba(184,133,74,.35); animation: vkdot .2s ease-out both, vkdotp .32s ease-in-out .2s infinite alternate; }
@keyframes vkdotp { from { box-shadow: 0 0 18px 5px rgba(184,133,74,.55), 0 0 60px 16px rgba(184,133,74,.2); } to { box-shadow: 0 0 30px 12px rgba(184,133,74,.9), 0 0 110px 34px rgba(184,133,74,.45); } }
@keyframes vkdot { from { opacity: 0; transform: scale(.3); } to { opacity: 1; transform: none; } }
.vk-ld-beam { position: absolute; inset: 0; filter: blur(22px); animation: vkbeamp .32s ease-in-out infinite alternate; }
@keyframes vkbeamp { from { opacity: .62; } to { opacity: 1; } }
.vk-ld-beam i { position: absolute; inset: 0; background: linear-gradient(90deg, rgba(184,133,74,.6), rgba(184,133,74,0));
  clip-path: polygon(96px 50%, calc(96px + var(--p) * 1100px) 18%, calc(96px + var(--p) * 1100px) 82%); }
.vk-ld-word { position: absolute; inset: 0; display: grid; place-items: center; font: 400 64px 'Gilda Display'; color: #EDE7DB; letter-spacing: .34em; padding-left: .34em; text-shadow: 0 0 26px rgba(184,133,74,.55);
  -webkit-mask-image: linear-gradient(90deg, #000 calc(var(--p) * 1100px - 20px), transparent calc(var(--p) * 1100px + 110px)); mask-image: linear-gradient(90deg, #000 calc(var(--p) * 1100px - 20px), transparent calc(var(--p) * 1100px + 110px)); }
.vk-ld-word span { display: block; padding-left: .34em; }`;

/** Tells the hero (and anything else) the loader is opening: the hook types in, the arc draws. */
export const OPEN_EVENT = "vk:open";
export const hasOpened = () => typeof window !== "undefined" && (window as unknown as { __vkOpen?: boolean }).__vkOpen === true;

/**
 * Loader (I-VK1 "Headlight", custom): a bronze dot lights at the left, a soft beam sweeps VASKARO (letters show only where it has touched),
 * then the beam widens until it floods the screen and the plate opens onto the hero. The sweep is CSS (--p, from the first paint);
 * the flood is one tween of --w. About 1.15 s: the flood starts at 0.75 s (waits only until the first hero frame is in and the fonts are ready). Sets `data-loader` so ?record=1 starts its clock after it.
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
    // frame 0 first, alone (the page also preloads it in the <head>): then the clip streams in and frame 0 comes from the cache
    const first = () => ensureClip(HERO_CLIPS[0]);
    const im = new Image();
    im.onload = im.onerror = first;
    im.src = `${HERO_CLIPS[0]}/frame_0001.webp`;
    // the sweep is a CSS animation that starts when the stylesheet lands (late on a slow link): count the 0.75 s from there
    const sweepMs = () => {
      const a = el.getAnimations().find((x) => (x as CSSAnimation).animationName === "vkp");
      return a ? Number(a.currentTime ?? 0) : performance.now() - t0;
    };
    const t0 = performance.now();
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
    // ready = the first hero frame is decoded and the two fonts the hero uses are in (checked once the site stylesheet has landed);
    // the rest of clip 1 keeps streaming behind the hero
    let fontsOk = false, kicked = false;
    const cssIn = () => [...document.querySelectorAll('link[rel="stylesheet"]')].every((l) => (l as HTMLLinkElement).sheet);
    const poll = setInterval(() => {
      if (!kicked && cssIn()) {
        kicked = true;
        Promise.all([document.fonts.load('400 64px "Gilda Display"'), document.fonts.load('700 14px "Chivo Variable"')]).then(() => { fontsOk = true; }, () => { fontsOk = true; });
      }
      if (sweepMs() >= 750 && fontsOk && clipFrame(HERO_CLIPS[0], 0)) { clearInterval(poll); lift(); }
    }, 40);
    const hard = setTimeout(() => { clearInterval(poll); lift(); }, 7000);
    return () => { clearInterval(poll); clearTimeout(hard); };
  }, []);

  if (gone) return null;
  return (
    <div ref={root} data-loader className="vk-ld" aria-hidden>
      <style>{CSS}</style>
      <div className="vk-ld-beam"><i /></div>
      <div className="vk-ld-word"><span>VASKARO</span></div>
      <div className="vk-ld-dot" />
    </div>
  );
}

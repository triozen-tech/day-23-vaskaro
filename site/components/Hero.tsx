"use client";
import { useEffect, useRef } from "react";
import { isStatic } from "./kit";
import { OPEN_EVENT, hasOpened } from "./Loader";
import FrameScrub from "@/components/video/FrameScrub";
import type { Seg } from "@/lib/chain";
import { HERO_CLIPS } from "../content";
import { sm } from "./kit";

// Joins (units = frames at 24 fps): V1>V2 and V2>V3 get a 0.3 s crossfade (7 units); V3>V4 is near-identical, so a plain swap.
const FADES = [0.5, 7, 7, 0.5];
const SEGS: Seg[] = HERO_CLIPS.map((clip, i) => ({ clip, fade: FADES[i] }));
const HOOK = "Mountain roads on a scroll wheel.";
const ARC = "M1180 290 A300 300 0 0 1 1180 790";

/** Hero: the V1..V4 chain scrubbed by scroll, with the layout's text, arc and handle driven by the same progress. */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const arc = useRef<SVGPathElement>(null);
  const ent = useRef(isStatic() ? 1 : 0);

  // Entry (fired by the loader-open event, not behind the loader): the hook types in (M21), the arc draws on (M8), the title rises.
  useEffect(() => {
    const r = root.current!;
    const txt = r.querySelector("#hk span") as HTMLElement;
    const arcEl = arc.current!;
    const L = arcEl.getTotalLength();
    if (isStatic()) { txt.textContent = HOOK; return; }
    arcEl.style.strokeDasharray = String(L);
    arcEl.style.strokeDashoffset = String(L);
    let timer = 0;
    const play = () => {
      const t0 = performance.now();
      const loop = () => {
        const e = (performance.now() - t0) / 1000;
        txt.textContent = HOOK.slice(0, Math.min(HOOK.length, Math.floor(e / 0.9 * HOOK.length)));
        const k = Math.min(1, e / 1.1), ease = 1 - Math.pow(1 - k, 3);
        arcEl.style.strokeDashoffset = String(L * (1 - ease));
        ent.current = ease;
        if (e < 1.2) timer = requestAnimationFrame(loop);
        else ent.current = 1;
      };
      loop();
    };
    if (hasOpened()) play(); else window.addEventListener(OPEN_EVENT, play, { once: true });
    return () => { window.removeEventListener(OPEN_EVENT, play); cancelAnimationFrame(timer); };
  }, []);

  const onProgress = (p: number, still: boolean) => {
    const r = root.current;
    if (!r) return;
    if (still) p = 1;
    const $ = (s: string) => r.querySelector(s) as HTMLElement;
    const fade = 1 - sm(p, 0.4, 0.55);
    const en = ent.current;
    $("#t1").style.opacity = String(fade * en);
    $("#t1").style.transform = `translateY(${(1 - en) * 26}px)`;
    $("#sm1").style.opacity = String(fade);
    $("#hk").style.opacity = String(fade);
    $("#dr").style.opacity = String((1 - sm(p, 0.5, 0.65)) * en);
    const a = sm(p, 0.82, 0.95);
    const t2 = $("#t2");
    t2.style.opacity = String(a);
    t2.style.transform = `translateX(${(1 - a) * -140}px)`;
    t2.style.filter = a < 1 ? `blur(${(1 - a) * 10}px)` : "none";
    $("#gh").style.opacity = String(sm(p, 0.88, 1) * 0.9);
    const tg = $("#tg");
    tg.style.opacity = String(sm(p, 0.9, 1));
    tg.style.transform = `translateY(${(1 - sm(p, 0.9, 1)) * 24}px)`;
    const arcEl = arc.current!;
    const L = arcEl.getTotalLength();
    const hp = arcEl.getPointAtLength(L * (p < 0.82 ? p / 0.82 : 1));
    const h = r.querySelector("#handle") as SVGCircleElement;
    h.setAttribute("cx", String(hp.x));
    h.setAttribute("cy", String(hp.y));
    const gone = 1 - sm(p, 0.8, 0.9);
    h.style.opacity = String(gone * en);
    const ring = r.querySelector("#hring") as SVGCircleElement;
    const ph = still ? 0 : (performance.now() / 1700) % 1;
    ring.setAttribute("cx", String(hp.x));
    ring.setAttribute("cy", String(hp.y));
    ring.setAttribute("r", String(8 + ph * 30));
    ring.style.opacity = String((1 - ph) * 0.8 * gone * en * (still ? 0 : 1));
    arcEl.style.opacity = String(gone);
  };

  return (
    <section className="track" id="hero-track" data-record-time="0.001" data-record-hold="2" style={{ height: 3400 }}>
      <div className="pin vk-hero" ref={root}>
        <FrameScrub segs={SEGS} clipOrder={HERO_CLIPS} stillAt={1} onProgress={onProgress} className="absolute inset-0" />
        <div className="vk-hero-shade" />
        <svg className="vk-stage" viewBox="0 0 1440 900">
          <path ref={arc} d={ARC} fill="none" stroke="#EDE7DB55" strokeWidth="1.5" />
          <circle id="hring" r="8" cx="1180" cy="290" fill="none" stroke="#EDE7DB" strokeWidth="1.5" />
          <circle id="handle" r="8" cx="1180" cy="290" fill="#EDE7DB" style={{ filter: "drop-shadow(0 0 8px #fff)" }} />
        </svg>
        <div className="title1" id="t1">UNCOVER<em>the ascent</em></div>
        <div className="hook" id="hk"><span /><i /></div>
        <div className="vk-small" id="sm1" style={{ left: 330, top: 690 }}>A mountain machine, kept under cloth until the road calls. Pull the handle and it wakes.</div>
        <div className="drag" id="dr" style={{ left: 1210, top: 760 }}>SCROLL TO REVEAL</div>
        <div className="title2" id="t2" style={{ opacity: 0 }}><div className="a">VASKARO</div><div className="b">PASSO<br />650</div></div>
        <div className="ghost" id="gh" style={{ opacity: 0 }}>650</div>
        <div className="tag2" id="tg" style={{ opacity: 0 }}>MADE FOR<br /><em>the hairpin</em><p>Six gears, one bronze lamp, a long road up. Calm at idle. Sharp when it climbs.</p><u>READ MORE →</u></div>
      </div>
    </section>
  );
}

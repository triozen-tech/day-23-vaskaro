"use client";
import { useRef } from "react";
import FrameScrub from "@/components/video/FrameScrub";
import type { Seg } from "@/lib/chain";
import { HERO_CLIPS } from "../content";
import { sm } from "./kit";

// Plain joins: the clips are near-identical at each cut, so a half-frame fade is a straight swap.
const SEGS: Seg[] = HERO_CLIPS.map((clip) => ({ clip, fade: 0.5 }));
const ARC = "M1180 290 A300 300 0 0 1 1180 790";

/** Hero: the V1..V4 chain scrubbed by scroll, with the layout's text, arc and handle driven by the same progress. */
export default function Hero() {
  const root = useRef<HTMLDivElement>(null);
  const arc = useRef<SVGPathElement>(null);

  const onProgress = (p: number, still: boolean) => {
    const r = root.current;
    if (!r) return;
    if (still) p = 1;
    const $ = (s: string) => r.querySelector(s) as HTMLElement;
    const fade = 1 - sm(p, 0.4, 0.55);
    $("#t1").style.opacity = String(fade);
    $("#sm1").style.opacity = String(fade);
    $("#dr").style.opacity = String(1 - sm(p, 0.5, 0.65));
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
    const gone = String(1 - sm(p, 0.8, 0.9));
    h.style.opacity = gone;
    arcEl.style.opacity = gone;
  };

  return (
    <section className="track" id="hero-track" style={{ height: 3400 }}>
      <div className="pin vk-hero" ref={root}>
        <FrameScrub segs={SEGS} clipOrder={HERO_CLIPS} stillAt={1} onProgress={onProgress} className="absolute inset-0" />
        <div className="vk-hero-shade" />
        <svg className="vk-stage" viewBox="0 0 1440 900">
          <path ref={arc} d={ARC} fill="none" stroke="#EDE7DB55" strokeWidth="1.5" />
          <circle id="handle" r="8" cx="1180" cy="290" fill="#EDE7DB" style={{ filter: "drop-shadow(0 0 8px #fff)" }} />
        </svg>
        <div className="title1" id="t1">UNCOVER<em>the ascent</em></div>
        <div className="vk-small" id="sm1" style={{ left: 330, top: 690 }}>A mountain machine, kept under cloth until the road calls. Pull the handle and it wakes.</div>
        <div className="drag" id="dr" style={{ left: 1210, top: 760 }}>SCROLL TO REVEAL</div>
        <div className="title2" id="t2" style={{ opacity: 0 }}><div className="a">VASKARO</div><div className="b">PASSO<br />650</div></div>
        <div className="ghost" id="gh" style={{ opacity: 0 }}>650</div>
        <div className="tag2" id="tg" style={{ opacity: 0 }}>MADE FOR<br /><em>the hairpin</em><p>Six gears, one bronze lamp, a long road up. Calm at idle. Sharp when it climbs.</p><u>READ MORE →</u></div>
      </div>
    </section>
  );
}

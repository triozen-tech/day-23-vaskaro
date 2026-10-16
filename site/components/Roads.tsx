"use client";
import { useRef } from "react";
import { IMG, ROADS } from "../content";
import { RIDGE, clamp, entry, prog, sm, useFrame } from "./kit";

/** Roads: arrives over a ridge-line edge (X3), then a pinned horizontal rail; each route line draws as its card enters. */
export default function Roads() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useFrame(root, (_t, still) => {
    const r = root.current!;
    const p = still ? 1 : prog(track.current!);
    // X3 edge shape morph: the paper's edge is a mountain ridge that flattens as the rail arrives
    const e = still ? 1 : sm(entry(track.current!), 0, 0.85);
    const A = (1 - e) * 300;
    r.style.clipPath = e >= 1 ? "" : `polygon(${RIDGE.map((h, i) => `${(i * 100) / 24}% ${(h * A).toFixed(1)}px`).join(",")},100% 100%,0 100%)`;
    const W = 5 * 480 + 80 - 1440 + 120;
    (r.querySelector(".rail") as HTMLElement).style.transform = `translateX(${-W * p}px)`;
    (r.querySelector("#rprog") as HTMLElement).style.width = `${(still ? 1 : p) * 100}%`;
    const idx = Math.min(ROADS.length - 1, Math.round(p * (ROADS.length - 1)));
    (r.querySelector("#ridx") as HTMLElement).textContent = `0${idx + 1} / 0${ROADS.length}`;
    (r.querySelector("#rname") as HTMLElement).textContent = `${ROADS[idx].name} · ${ROADS[idx].meta}`;
    r.querySelectorAll<HTMLElement>(".rc").forEach((c) => {
      const vis = still ? 1 : clamp((1440 - c.getBoundingClientRect().left) / 700);
      (c.querySelector(".rp") as SVGPathElement).style.strokeDashoffset = String(700 * (1 - vis));
      c.style.transform = `translateY(${(1 - vis) * 40}px)`;
    });
  });
  return (
    <section className="track" id="roads" data-record-time="1.5" ref={track} style={{ height: 2600 }}>
      <div className="pin vk-roads" ref={root}>
        <h2>Five roads worth the climb.</h2>
        <div className="rail">
          {ROADS.map((c) => (
            <div key={c.name} className="rc" data-vc="ride" tabIndex={0} data-hover-demo={c.name === "Tea Terrace Run" ? "" : undefined}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/${c.img}.jpg`} alt={c.name} />
              <svg viewBox="0 0 440 520"><path className="rp" d={c.d} fill="none" stroke="#B8854A" strokeWidth="3" strokeDasharray="700" strokeDashoffset="700" /><path className="rp2" d={c.d} fill="none" strokeWidth="4" strokeLinecap="round" /></svg>
              <div className="t"><h3>{c.name}</h3><p>{c.meta}</p></div>
            </div>
          ))}
        </div>
        <div className="rfoot">
          <span id="ridx">01 / 05</span>
          <div className="rbar"><i id="rprog" /></div>
          <span id="rname">{ROADS[0].name} · {ROADS[0].meta}</span>
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { IMG, ROADS } from "../content";
import { clamp, prog, useFrame } from "./kit";

/** Roads: a pinned horizontal rail; each route line draws as its card enters. */
export default function Roads() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useFrame(root, (_t, still) => {
    const r = root.current!;
    const p = still ? 1 : prog(track.current!);
    const W = 5 * 480 + 80 - 1440 + 120;
    (r.querySelector(".rail") as HTMLElement).style.transform = `translateX(${-W * p}px)`;
    r.querySelectorAll<HTMLElement>(".rc").forEach((c) => {
      const vis = still ? 1 : clamp((1440 - c.getBoundingClientRect().left) / 700);
      (c.querySelector(".rp") as SVGPathElement).style.strokeDashoffset = String(700 * (1 - vis));
      c.style.transform = `translateY(${(1 - vis) * 40}px)`;
    });
  });
  return (
    <section className="track" id="roads" ref={track} style={{ height: 2600 }}>
      <div className="pin vk-roads" ref={root}>
        <h2>Five roads worth the climb.</h2>
        <div className="rail">
          {ROADS.map((c) => (
            <div key={c.name} className="rc" data-cursor="Ride">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={`${IMG}/${c.img}.jpg`} alt={c.name} />
              <svg viewBox="0 0 440 520"><path className="rp" d={c.d} fill="none" stroke="#B8854A" strokeWidth="3" strokeDasharray="700" strokeDashoffset="700" /></svg>
              <div className="t"><h3>{c.name}</h3><p>{c.meta}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { clamp, entry, sm, useFrame } from "./kit";

/** Footer: stamps down on the page (X16), giant wordmark rising letter by letter; never still (stripes + drift in CSS). */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useFrame(root, (_t, still) => {
    const r = root.current!;
    const p = still ? 1 : clamp(1 - r.getBoundingClientRect().top / 900);
    // X16 cut-and-stamp: the bronze plate lands with a small jolt that settles (a pure function of the scroll position)
    const e = still ? 1 : entry(r);
    const k = clamp((e - 0.8) / 0.2);
    const jolt = still || e >= 1 ? 0 : -16 * Math.sin(k * Math.PI) * (1 - k);
    r.style.translate = jolt ? `0 ${jolt.toFixed(2)}px` : "";
    r.style.boxShadow = still || e >= 1 ? "" : `0 -${(24 * (1 - e)).toFixed(0)}px 60px rgba(0,0,0,${(0.5 * (1 - e)).toFixed(2)})`;
    r.querySelectorAll<HTMLElement>(".word span").forEach((s, i) => {
      const a = sm(p, i * 0.07, 0.5 + i * 0.07);
      s.style.transform = `translateY(${(1 - a) * 320}px)`;
      s.style.opacity = String(a);
    });
  });
  return (
    <footer id="foot" data-record-time="2.8" data-record-hold="0.8" ref={root}>
      <div className="cols">
        <div><b>RIDE</b><a href="#models">Models</a><a href="#book">Test ride</a><a href="#roads">Rides</a></div>
        <div><b>SHOP</b><a href="#gear">Gear</a><a href="#book">Service pack ₹ 12,000</a><a href="#book">Tyre-change day ₹ 3,500</a></div>
        <div><b>VASKARO</b><a href="#models">Story</a><a href="#book">Contact</a></div>
      </div>
      <div className="note">All prices sample.<br />Concept website by Triozen Tech</div>
      <div className="word">{[..."VASKARO"].map((c, i) => <span key={i}>{c}</span>)}</div>
    </footer>
  );
}

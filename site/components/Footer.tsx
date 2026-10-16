"use client";
import { useRef } from "react";
import { clamp, sm, useFrame } from "./kit";

/** Footer: bronze band, giant wordmark rising letter by letter. */
export default function Footer() {
  const root = useRef<HTMLElement>(null);
  useFrame(root, (_t, still) => {
    const r = root.current!;
    const p = still ? 1 : clamp(1 - r.getBoundingClientRect().top / 900);
    r.querySelectorAll<HTMLElement>(".word span").forEach((s, i) => {
      const a = sm(p, i * 0.07, 0.5 + i * 0.07);
      s.style.transform = `translateY(${(1 - a) * 320}px)`;
      s.style.opacity = String(a);
    });
  });
  return (
    <footer id="foot" ref={root}>
      <div className="cols">
        <div><b>RIDE</b>Models<br />Test ride<br />Rides</div>
        <div><b>SHOP</b>Gear<br />Service pack ₹ 12,000<br />Tyre-change day ₹ 3,500</div>
        <div><b>VASKARO</b>Story<br />Contact</div>
      </div>
      <div className="note">All prices sample.<br />Concept website by Triozen Tech</div>
      <div className="word">{[..."VASKARO"].map((c, i) => <span key={i}>{c}</span>)}</div>
    </footer>
  );
}

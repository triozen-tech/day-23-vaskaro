"use client";
import { useRef } from "react";
import { IMG, SHOP } from "../content";
import { clamp, sm, useFrame } from "./kit";

/** Gear shop on paper: cards rise in a stagger, tilt toward the cursor, quick-add slides up, product drifts on hover. */
export default function GearShop() {
  const root = useRef<HTMLElement>(null);
  useFrame(root, (_t, still) => {
    const r = root.current!;
    const p = still ? 1 : clamp(1 - r.getBoundingClientRect().top / 700);
    r.querySelectorAll<HTMLElement>(".pc").forEach((c, i) => {
      const a = sm(p, 0.1 + i * 0.12, 0.5 + i * 0.12);
      c.style.opacity = String(a);
      c.style.transform = `translateY(${(1 - a) * 90}px)`;
    });
  });
  // hover: the card's inner layer tilts toward the pointer (CSS transition, so it eases back on leave); the outer card only does the entrance
  const move = (e: React.MouseEvent<HTMLDivElement>) => {
    const c = e.currentTarget, b = c.getBoundingClientRect();
    c.style.setProperty("--rx", `${-((e.clientY - b.top) / b.height - 0.5) * 9}deg`);
    c.style.setProperty("--ry", `${((e.clientX - b.left) / b.width - 0.5) * 9}deg`);
  };
  const leave = (e: React.MouseEvent<HTMLDivElement>) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };
  return (
    <section id="gear" data-record-time="3.5" data-record-hold="1.6" ref={root}>
      <div className="eyebrow">Gear shop · all prices sample</div>
      <h2>Dress for the pass.</h2>
      <div className="grid">
        {SHOP.map((s, i) => (
          <div key={s.name} className="pc" data-hover-demo={i === 0 || i === 2 ? "" : undefined} data-vc="view" tabIndex={0} onMouseMove={move} onMouseLeave={leave}>
            <div className="lift">
            <div className="ph"><img loading="lazy" decoding="async" src={`${IMG}/${s.img}.webp`} alt={s.name} /></div>
            <div className="in">
              <h4>{s.name}</h4>
              <div className="pr">{s.price}<small>SAMPLE</small></div>
              {s.chips && <div style={{ marginTop: 12 }}>{s.chips.map((c, k) => <i key={c} className="chip" style={{ background: c, transitionDelay: `${k * 60}ms` }} />)}</div>}
            </div>
            <button className="add" data-vc="pick" data-vcl="ADD">ADD TO CART <span>→</span></button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

"use client";
import { useRef } from "react";
import { IMG, SHOP } from "../content";
import { clamp, sm, useFrame } from "./kit";

/** Gear shop on paper: cards rise in a stagger, tilt toward the cursor, quick-add slides up, product drifts on hover. */
export default function GearShop() {
  const root = useRef<HTMLElement>(null);
  const tilt = useRef<boolean[]>([]);
  useFrame(root, (_t, still) => {
    const r = root.current!;
    const p = still ? 1 : clamp(1 - r.getBoundingClientRect().top / 700);
    r.querySelectorAll<HTMLElement>(".pc").forEach((c, i) => {
      if (tilt.current[i]) return;
      const a = sm(p, 0.1 + i * 0.12, 0.5 + i * 0.12);
      c.style.opacity = String(a);
      c.style.transform = `translateY(${(1 - a) * 90}px)`;
    });
  });
  const move = (i: number, e: React.MouseEvent<HTMLDivElement>) => {
    const c = e.currentTarget, b = c.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - 0.5, y = (e.clientY - b.top) / b.height - 0.5;
    tilt.current[i] = true;
    c.style.transform = `perspective(800px) rotateY(${x * 10}deg) rotateX(${-y * 10}deg) translateY(-6px)`;
    c.style.boxShadow = "0 24px 40px #0003";
  };
  const leave = (i: number, e: React.MouseEvent<HTMLDivElement>) => { tilt.current[i] = false; e.currentTarget.style.boxShadow = ""; };
  return (
    <section id="gear" ref={root}>
      <div className="eyebrow">Gear shop · all prices sample</div>
      <h2>Dress for the pass.</h2>
      <div className="grid">
        {SHOP.map((s, i) => (
          <div key={s.name} className="pc" data-hover-demo={i === 0 || i === 2 ? "" : undefined} onMouseMove={(e) => move(i, e)} onMouseLeave={(e) => leave(i, e)}>
            <div className="ph"><img src={`${IMG}/${s.img}.jpg`} alt={s.name} /></div>
            <div className="in">
              <h4>{s.name}</h4>
              <div className="pr">{s.price}<small>SAMPLE</small></div>
              {s.chips && <div style={{ marginTop: 12 }}>{s.chips.map((c) => <i key={c} className="chip" style={{ background: c }} />)}</div>}
            </div>
            <div className="add">ADD TO CART</div>
          </div>
        ))}
      </div>
    </section>
  );
}

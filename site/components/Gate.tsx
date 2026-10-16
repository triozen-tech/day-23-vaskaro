"use client";
import { useRef } from "react";
import { GEARS } from "../content";
import { prog, sm, useFrame } from "./kit";

/** Gate (signature): scroll turns a six-gear dial, the road line draws, the headline swaps per gear. */
export default function Gate() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useFrame(root, (t, still) => {
    const r = root.current!;
    const $ = (s: string) => r.querySelector(s) as HTMLElement;
    const p = still ? 1 : prog(track.current!);
    const gp = p * 5, gi = Math.round(gp);
    $("#gdial").setAttribute("transform", `rotate(${-gp * 60 + (still ? 0 : Math.sin(t * 1.5) * 0.6)})`);
    $("#rpath").style.strokeDashoffset = String(1800 * (1 - sm(p, 0, 1)));
    const gt = $("#gt");
    if (gt.dataset.i !== String(gi)) { gt.dataset.i = String(gi); gt.textContent = GEARS[gi]; $("#gn").textContent = String(gi + 1); $("#gch").textContent = String(gi + 1); }
    const d = Math.abs(gp - gi);
    gt.style.transform = `translateY(${d * -30}px)`;
    gt.style.opacity = String(1 - d * 1.2);
    $("#gn").style.opacity = String(1 - d * 1.6);
  });
  return (
    <section className="track" id="gate" ref={track} style={{ height: 3000 }}>
      <div className="pin vk-gate" ref={root}>
        <svg className="road" viewBox="0 0 1440 900">
          <path id="rpath" d="M-20 820 C300 760 380 560 700 600 S1000 300 1460 200" fill="none" stroke="#B8854A" strokeWidth="3" strokeDasharray="1800" strokeDashoffset="1800" />
          <path d="M-20 860 C300 800 380 600 700 640 S1000 340 1460 240" fill="none" stroke="#EDE7DB22" strokeWidth="2" />
          <g transform="translate(1000 450)">
            <circle r="230" fill="none" stroke="#EDE7DB22" strokeWidth="2" />
            <circle r="170" fill="none" stroke="#EDE7DB11" strokeWidth="30" strokeDasharray="3 14" />
            <g id="gdial">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i} transform={`rotate(${i * 60})`}>
                  <circle cy="-200" r="24" fill="#1A1F24" stroke="#EDE7DB55" strokeWidth="2" />
                  <text y="-193" textAnchor="middle" fill="#EDE7DB" fontFamily="Gilda Display" fontSize="22" transform={`rotate(${-i * 60} 0 -200)`}>{i + 1}</text>
                </g>
              ))}
            </g>
            <path d="M0 -250 L-9 -228 L9 -228Z" fill="#B8854A" />
          </g>
        </svg>
        <div className="eyebrow" style={{ position: "absolute", left: 80, top: 150 }}>Chapter <span id="gch">1</span> of 6</div>
        <h2 id="gt">{GEARS[0]}</h2>
        <div className="cap" id="gcap">Scroll turns the dial one gear at a time. Each click moves the bike one bend further up the pass.</div>
        <div className="gnum" id="gn">1</div>
      </div>
    </section>
  );
}

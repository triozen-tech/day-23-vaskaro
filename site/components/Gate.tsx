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
    // one gear per scroll step (M30): the dial dwells on each gear, then turns to the next in the last part of its step
    const raw = Math.min(5, p * 5.0001), fl = Math.floor(raw);
    const gp = fl >= 5 ? 5 : fl + sm(raw - fl, 0.3, 1), gi = Math.round(gp);
    const dial = -gp * 60 + (still ? 0 : Math.sin(t * 1.5) * 0.6);
    $("#gdial").setAttribute("transform", `rotate(${dial})`);
    r.querySelectorAll<SVGTextElement>("text.gn6").forEach((n, i) => n.setAttribute("transform", `rotate(${-(i * 60 + dial)} 0 -200)`));
    const rp = $("#rpath") as unknown as SVGPathElement;
    const L = rp.getTotalLength(), k = gp / 5;
    rp.style.strokeDasharray = String(L);
    rp.style.strokeDashoffset = String(L * (1 - k));
    const bp = rp.getPointAtLength(L * k), bq = rp.getPointAtLength(Math.min(L, L * k + 2));
    const bike = $("#gbike");
    bike.setAttribute("transform", `translate(${bp.x} ${bp.y}) rotate(${(Math.atan2(bq.y - bp.y, bq.x - bp.x) * 180) / Math.PI})`);
    $("#gglow").setAttribute("r", String(16 + (still ? 0 : Math.sin(t * 3) * 3)));
    const gt = $("#gt");
    if (gt.dataset.i !== String(gi)) { gt.dataset.i = String(gi); gt.textContent = GEARS[gi]; $("#gn").textContent = String(gi + 1); $("#gch").textContent = String(gi + 1); }
    const d = Math.abs(gp - gi);
    gt.style.transform = `translateY(${d * -30}px)`;
    gt.style.opacity = String(1 - d * 1.2);
    $("#gn").style.opacity = String(1 - d * 1.6);
  });
  return (
    <section className="track" id="gate" data-record-time="5" ref={track} style={{ height: 3000 }}>
      <div className="pin vk-gate" ref={root}>
        <svg className="road" viewBox="0 0 1440 900">
          <path id="rpath" d="M-20 820 C300 760 380 560 700 600 S1000 300 1460 200" fill="none" stroke="#B8854A" strokeWidth="3" strokeDasharray="1800" strokeDashoffset="1800" />
          <g id="gbike"><circle id="gglow" r="16" fill="#B8854A" opacity=".25" /><circle r="7" fill="#B8854A" /><path d="M-6 -3 L9 0 L-6 3Z" fill="#101316" /></g>
          <path d="M-20 860 C300 800 380 600 700 640 S1000 340 1460 240" fill="none" stroke="#EDE7DB22" strokeWidth="2" />
          <g transform="translate(1000 450)">
            <circle r="230" fill="none" stroke="#EDE7DB22" strokeWidth="2" />
            <circle r="170" fill="none" stroke="#EDE7DB11" strokeWidth="30" strokeDasharray="3 14" />
            <g id="gdial">
              {[0, 1, 2, 3, 4, 5].map((i) => (
                <g key={i} transform={`rotate(${i * 60})`}>
                  <circle cy="-200" r="24" fill="#1A1F24" stroke="#EDE7DB55" strokeWidth="2" />
                  <text className="gn6" y="-193" textAnchor="middle" fill="#EDE7DB" fontFamily="Gilda Display" fontSize="22" transform={`rotate(${-i * 60} 0 -200)`}>{i + 1}</text>
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

"use client";
import { useRef } from "react";
import { IMG, SPECS, SPEC_LINES } from "../content";
import { lerp, prog, sm, useFrame } from "./kit";

/** Engine: callout lines draw, numbers count up, the Passo cut-out drifts. */
export default function Engine() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  useFrame(root, (t, still) => {
    const r = root.current!;
    const p = still ? 1 : prog(track.current!);
    r.querySelectorAll<SVGPathElement>("#lines path").forEach((l, i) => (l.style.strokeDashoffset = String(400 * (1 - sm(p, 0.1 + i * 0.17, 0.3 + i * 0.17)))));
    r.querySelectorAll<SVGCircleElement>("#dots circle").forEach((d, i) => { d.style.opacity = String(sm(p, 0.1 + i * 0.17, 0.2 + i * 0.17)); d.setAttribute("r", String(still ? 4.5 : 4.5 + Math.sin(t * 3 + i) * 1.6)); });
    SPECS.forEach((s, i) => {
      const e = r.querySelector("#" + s.id) as HTMLElement, a = sm(p, 0.28 + i * 0.17, 0.42 + i * 0.17);
      e.style.opacity = String(a);
      e.querySelector("b")!.textContent = String(Math.round(s.n * a));
    });
    const b = r.querySelector("#engwrap") as HTMLElement;
    b.style.transform = `translate(${lerp(40, -40, p) + (still ? 0 : Math.sin(t * 0.8) * 14)}px, ${still ? 0 : Math.sin(t * 1.1) * 9}px)`;
  });
  return (
    <section className="track" id="engine" data-record-time="5.5" ref={track} style={{ height: 2200 }}>
      <div className="pin vk-engine" ref={root}>
        <div className="eyebrow" style={{ position: "absolute", left: 80, top: 130 }}>Engine and spec</div>
        <div className="serif" style={{ position: "absolute", left: 80, top: 170, fontSize: 64, lineHeight: 1, width: 480 }}>649 cc of patient torque.</div>
        <div id="engwrap" className="engwrap">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={`${IMG}/m-passo.png`} alt="Passo 650, side view" style={{ position: "absolute", left: 284, top: 246, width: 1055 }} />
          <svg viewBox="0 0 1440 900" style={{ position: "absolute", inset: 0 }}>
            <g fill="none" stroke="#B8854A" strokeWidth="1.5" strokeDasharray="400" id="lines">
              {SPEC_LINES.map((l) => <path key={l.d} d={l.d} style={{ strokeDashoffset: 400 }} />)}
            </g>
            <g fill="#B8854A" id="dots">
              {SPEC_LINES.map((l) => <circle key={l.d} cx={l.dot[0]} cy={l.dot[1]} r="4.5" opacity="0" />)}
            </g>
          </svg>
          {SPECS.map((s) => (
            <div key={s.id} className="call" id={s.id} style={{ left: s.left, top: s.top }}><b>0</b><span>{s.label}</span></div>
          ))}
        </div>
      </div>
    </section>
  );
}

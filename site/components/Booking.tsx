"use client";
import { useRef, useState } from "react";
import { BOOK } from "../content";
import { prog, useFrame } from "./kit";

const ROWS = [BOOK.models, BOOK.days, BOOK.slots];
const STEPS = ["1 · Choose model", "2 · Choose day", "3 · Choose slot"];

/** Booking: the visitor clicks the choices; scroll auto-ticks only in ?record=1. */
export default function Booking() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [pick, setPick] = useState<(number | null)[]>([null, null, null]);
  const rec = useRef(false);
  useFrame(root, (_t, still) => {
    if (still) return;
    rec.current = /[?&]record=1/.test(location.search);
    if (!rec.current) return;
    const p = prog(track.current!);
    const next = [0, 1, 2].map((k) => (p > k * 0.3 + 0.08 ? (k + 1) % ROWS[k].length : null));
    setPick((o) => (o.every((v, i) => v === next[i]) ? o : next));
  });
  const ok = pick.every((v) => v !== null);
  const first = pick.findIndex((v) => v === null);
  return (
    <section className="track" id="book" ref={track} style={{ height: 2000 }}>
      <div className="pin vk-book" ref={root}>
        <div className="eyebrow">Test-ride booking</div>
        <h2>Ride it up the pass.</h2>
        <p className="lead">Pick a model, a day and a slot. Token ₹ 10,000 (sample), fully refundable.</p>
        <div className="form">
          {ROWS.map((row, k) => (
            <div key={k}>
              <div className={"step" + (pick[k] !== null || k === first ? " on" : "")}><i>✓</i>{STEPS[k]}</div>
              <div className="row">
                {row.map((s, j) => (
                  <button key={s} className={"slot" + (pick[k] === j ? " on" : "")} data-hover-demo={k === 0 && j === 1 ? "click" : undefined} onClick={() => setPick((o) => o.map((v, i) => (i === k ? j : v)))}>{s}</button>
                ))}
              </div>
            </div>
          ))}
          <button className="btn" disabled={!ok} style={{ opacity: ok ? 1 : 0.35, transform: ok ? "scale(1.04)" : "", background: ok ? "#B8854A" : "" }}>CONFIRM RIDE</button>
        </div>
      </div>
    </section>
  );
}

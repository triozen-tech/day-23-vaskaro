"use client";
import { useRef, useState } from "react";
import { BOOK } from "../content";
import { entry, prog, sm, useFrame } from "./kit";

const ROWS = [BOOK.models, BOOK.days, BOOK.slots];
const STEPS = ["1 · Choose model", "2 · Choose day", "3 · Choose slot"];

/** Booking: arrives on a diagonal wipe (X7); in ?record=1 scroll ticks the three steps in order; normally the visitor clicks, then the confirm button comes alive. */
export default function Booking() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const [pick, setPick] = useState<(number | null)[]>([null, null, null]);
  const touched = useRef(false); // once the visitor clicks a choice, scroll stops choosing for them
  useFrame(root, (_t, still) => {
    const r = root.current!;
    // X7 diagonal wipe: a slanted edge sweeps up and flattens as the booking arrives
    const e = still ? 1 : sm(entry(track.current!), 0, 0.85);
    r.style.clipPath = e >= 1 ? "" : `polygon(0 ${((1 - e) * 360).toFixed(1)}px,100% 0,100% 100%,0 100%)`;
    // auto-ticking from scroll is for ?record=1 only; in normal mode the visitor clicks
    if (still || touched.current || !/[?&]record=1/.test(location.search)) return;
    const p = prog(track.current!);
    const next = [0, 1, 2].map((k) => (p > k * 0.3 + 0.08 ? (k + 1) % ROWS[k].length : null));
    setPick((o) => (o.every((v, i) => v === next[i]) ? o : next));
  });
  const ok = pick.every((v) => v !== null);
  const first = pick.findIndex((v) => v === null);
  return (
    <section className="track" id="book" data-record-time="4.2" data-record-hold="1" ref={track} style={{ height: 2000 }}>
      <div className="pin vk-book" ref={root}>
        <div className="intro">
          <div className="eyebrow">Test-ride booking</div>
          <h2>Ride it up the pass.</h2>
          <p className="lead">Pick a model, a day and a slot. Token ₹ 10,000 (sample), fully refundable.</p>
        </div>
        <div className="form">
          {ROWS.map((row, k) => (
            <div key={k}>
              <div className={"step" + (pick[k] !== null || k === first ? " on" : "")}><i>✓</i>{STEPS[k]}</div>
              <div className="row">
                {row.map((s, j) => (
                  <button key={s} className={"slot" + (pick[k] === j ? " on" : "")} data-hover-demo={k === 0 && j === 1 ? "click" : undefined} onClick={() => { touched.current = true; setPick((o) => o.map((v, i) => (i === k ? j : v))); }}>{s}</button>
                ))}
              </div>
            </div>
          ))}
          <button className={"btn" + (ok ? " live" : "")} disabled={!ok}>{ok ? "CONFIRM RIDE →" : "CONFIRM RIDE"}</button>
        </div>
      </div>
    </section>
  );
}

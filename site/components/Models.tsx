"use client";
import { useEffect, useRef } from "react";
import { IMG, MODELS } from "../content";
import { prog, useFrame } from "./kit";

/** Models: the scroll picks the model (a 1 s lock keeps fast scroll and reverse from overlapping); chips and arrows scroll to a step. */
export default function Models() {
  const track = useRef<HTMLElement>(null);
  const root = useRef<HTMLDivElement>(null);
  const st = useRef({ cur: -1, busy: false, want: 0 });

  const $ = (s: string) => root.current!.querySelector(s) as HTMLElement;
  const setModel = (i: number) => {
    const s = st.current, P = root.current!, m = MODELS[i];
    s.cur = i;
    P.style.setProperty("--c", m.c);
    const big = $("#mbig");
    big.style.transform = "translateX(120px)";
    big.style.opacity = "0";
    setTimeout(() => {
      if (s.cur !== i) return;
      big.textContent = m.n;
      big.style.transition = "none";
      big.style.transform = "translateX(-120px)";
      requestAnimationFrame(() => requestAnimationFrame(() => { big.style.transition = ""; big.style.transform = ""; big.style.opacity = "1"; }));
    }, 350);
    P.querySelectorAll<HTMLElement>(".bars i").forEach((b, k) => {
      b.style.transition = "none";
      b.style.transform = "scaleY(0)";
      requestAnimationFrame(() => requestAnimationFrame(() => { b.style.transition = `transform .8s ${k * 0.08}s cubic-bezier(.7,0,.2,1),background .6s`; b.style.transform = ""; }));
    });
    P.querySelectorAll<HTMLElement>(".mb").forEach((b, k) => b.classList.toggle("on", k === i));
    $("#mname").textContent = m.f;
    $("#mtxt").textContent = m.t;
    $("#mprice").firstChild!.textContent = m.p + " ";
    $("#mtag").innerHTML = `${m.g[0]}<br>${m.g[1]}`;
    P.querySelectorAll("#mchips button").forEach((c, k) => c.classList.toggle("on", k === i));
  };
  const goModel = (i: number) => {
    const s = st.current;
    s.want = i;
    if (s.busy || i === s.cur) return;
    s.busy = true;
    setModel(i);
    setTimeout(() => { s.busy = false; if (s.want !== s.cur) goModel(s.want); }, 1000);
  };
  const jump = (i: number) => {
    i = (i + 3) % 3;
    const T = track.current!, span = T.offsetHeight - 900;
    window.scrollTo({ top: T.offsetTop + span * ((i + 0.5) / 3), behavior: "smooth" });
  };

  useEffect(() => { setModel(0); st.current.cur = 0; /* eslint-disable-next-line react-hooks/exhaustive-deps */ }, []);
  useFrame(root, (t, still) => {
    if (still) return;
    const p = prog(track.current!);
    goModel(Math.min(2, Math.floor(p * 3)));
    $("#mprog").style.width = p * 100 + "%";
    const a = t * 0.6 + p * 6;
    const dot = $("#mdot");
    dot.style.left = 500 + Math.cos(a) * 500 - 7 + "px";
    dot.style.top = 140 + Math.sin(a) * 140 - 7 + "px";
    $("#mring").style.transform = `rotate(${-4 + Math.sin(t * 0.5) * 1.2}deg)`;
    root.current!.querySelectorAll<HTMLElement>(".mb.on").forEach((b) => (b.style.translate = `0 ${Math.sin(t * 1.2) * 4}px`));
  });

  return (
    <section className="track" id="models" data-record-time="6.5" ref={track} style={{ height: 2700 }}>
      <div className="pin vk-models" ref={root} style={{ ["--c" as string]: MODELS[0].c }}>
        <div className="big" id="mbig">PASSO</div>
        <div className="bars"><i style={{ height: 300 }} /><i className="bar2" style={{ height: 390 }} /><i style={{ height: 300 }} /></div>
        <div className="ring" id="mring"><b id="mdot" /></div>
        {MODELS.map((m, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={m.img} className={"mb bike" + (i === 0 ? " on" : "")} src={`${IMG}/${m.img}.png`} alt={m.f} />
        ))}
        <div className="sm"><h3 id="mname">{MODELS[0].f}</h3><p id="mtxt">{MODELS[0].t}</p><div className="price" id="mprice">{MODELS[0].p} <small>SAMPLE</small></div></div>
        <div className="chips" id="mchips">
          {MODELS.map((m, i) => <button key={m.n} className={i === 0 ? "on" : ""} aria-label={m.f} onClick={() => jump(i)} />)}
        </div>
        <div className="arrows"><button id="mprev" aria-label="Previous model" onClick={() => jump(st.current.cur - 1)} /><button id="mnext" aria-label="Next model" onClick={() => jump(st.current.cur + 1)} /></div>
        <div className="tagline" id="mtag">Climb<br />Calmly</div>
        <div className="card"><b>See details</b>Uncover the hidden<br />stories<div className="th" /></div>
        <div className="prog"><i id="mprog" /></div>
      </div>
    </section>
  );
}

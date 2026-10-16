"use client";
import { useEffect, useRef } from "react";
import { isStatic } from "./kit";

/** Site cursor: a bronze dot plus a trailing ring that changes shape by what is under it (data-vc="link|chip|arrow|view|ride|pick|confirm").
 *  Mouse only; off in ?static=1 and in ?record=1 (the record pointer plays the hovers there). No OS reduce-motion switch. */
const LABEL: Record<string, string> = { view: "VIEW", ride: "RIDE →", pick: "PICK", go: "GO", locked: "PICK 3" };

export default function VCursor() {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (isStatic() || /[?&]record=1/.test(location.search)) return;
    const el = root.current!, ring = el.querySelector(".r") as HTMLElement, lab = el.querySelector("b") as HTMLElement;
    const html = document.documentElement;
    let x = -100, y = -100, rx = -100, ry = -100, on = false, raf = 0, shown = false;
    const state = (t: EventTarget | null) => {
      const q = t as HTMLElement | null;
      const n = (q?.closest?.("[data-vc]") || q?.closest?.("a, button")) as HTMLElement | null;
      let s = n?.dataset.vc || (n ? "link" : "");
      if (s === "confirm") s = n!.querySelector(".btn.live") ? "go" : "locked";
      el.dataset.s = s;
      lab.textContent = n?.dataset.vcl || LABEL[s] || "";
    };
    const move = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      x = e.clientX; y = e.clientY;
      if (!shown) { shown = true; rx = x; ry = y; html.classList.add("vk-cur-on"); }
      el.classList.add("on"); on = true;
    };
    const over = (e: PointerEvent) => { if (e.pointerType === "mouse") state(e.target); };
    const down = () => el.classList.add("press");
    const up = () => el.classList.remove("press");
    const leave = () => { el.classList.remove("on"); on = false; };
    const loop = () => {
      rx += (x - rx) * 0.22; ry += (y - ry) * 0.22;
      el.style.setProperty("--x", x + "px"); el.style.setProperty("--y", y + "px");
      el.style.setProperty("--rx", rx.toFixed(1) + "px"); el.style.setProperty("--ry", ry.toFixed(1) + "px");
      raf = requestAnimationFrame(loop);
    };
    loop();
    addEventListener("pointermove", move); addEventListener("pointerover", over);
    addEventListener("pointerdown", down); addEventListener("pointerup", up);
    html.addEventListener("mouseleave", leave);
    return () => {
      cancelAnimationFrame(raf);
      removeEventListener("pointermove", move); removeEventListener("pointerover", over);
      removeEventListener("pointerdown", down); removeEventListener("pointerup", up);
      html.removeEventListener("mouseleave", leave); html.classList.remove("vk-cur-on");
    };
  }, []);
  return <div ref={root} className="vcur" aria-hidden="true"><i className="d" /><span className="r"><b /></span></div>;
}

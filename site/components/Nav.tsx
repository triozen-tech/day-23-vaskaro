"use client";
import { useEffect, useRef } from "react";

/** Fixed nav; turns dark-on-paper while it crosses the gear shop. */
export default function Nav() {
  const nav = useRef<HTMLElement>(null);
  useEffect(() => {
    let raf = 0;
    const loop = () => {
      const g = document.getElementById("gear");
      if (g && nav.current) {
        const r = g.getBoundingClientRect();
        nav.current.classList.toggle("dark", r.top < 64 && r.bottom > 64);
      }
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => cancelAnimationFrame(raf);
  }, []);
  return (
    <nav ref={nav} className="vk-nav">
      <b>VASKARO</b>
      <div className="mid">Mountain roads on a scroll wheel.</div>
      <div className="r">
        <a href="#models">Models</a><a href="#gear">Gear</a><a href="#roads">Rides</a><a href="#book" data-hover-demo>Book a ride</a>
        <div className="burger" />
      </div>
    </nav>
  );
}

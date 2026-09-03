"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Barra de progresso presa ao scroll pelo `scrub` do GSAP.
 *
 * A versão anterior ouvia o evento de scroll e animava com transição de CSS —
 * com o Lenis no meio, a barra chegava sempre um pouco atrasada. Com `scrub`
 * ela é o scroll: não há interpolação própria para ficar para trás.
 */
export default function ScrollProgressBar() {
  const barra = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = barra.current;
    if (!node) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        node,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="pointer-events-none fixed top-0 right-0 left-0 z-[60] h-[3px] bg-transparent">
      <div
        ref={barra}
        className="h-full origin-left scale-x-0 bg-gradient-to-r from-forest-600 via-forest-700 to-amber-500"
      />
    </div>
  );
}

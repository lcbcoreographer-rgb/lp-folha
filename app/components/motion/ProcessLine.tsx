"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Linha vertical que se desenha conforme a pessoa desce, acendendo cada etapa
 * quando o traço a alcança.
 *
 * É a ideia central do site em uma peça só: o licenciamento é uma sequência, e
 * o site a percorre junto com quem lê. Feito com ScrollTrigger e não com
 * Framer porque aqui o progresso precisa ser o scroll, sem mola nem atraso.
 */
export default function ProcessLine({
  etapas,
}: {
  etapas: { titulo: string; descricao: string }[];
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = raiz.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-traco]",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: { trigger: node, start: "top 70%", end: "bottom 75%", scrub: 0.6 },
        }
      );

      gsap.utils.toArray<HTMLElement>("[data-etapa]").forEach((etapa) => {
        gsap.fromTo(
          etapa,
          { opacity: 0.25, x: -14 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            ease: "power2.out",
            scrollTrigger: { trigger: etapa, start: "top 72%" },
          }
        );
      });
    }, node);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={raiz} className="relative pl-10 sm:pl-14">
      {/* trilho apagado + traço que cresce por cima dele */}
      <div className="absolute top-2 bottom-2 left-[11px] w-px bg-forest-950/12 sm:left-[19px]" />
      <div
        data-traco
        className="absolute top-2 bottom-2 left-[11px] w-px origin-top bg-forest-700 sm:left-[19px]"
      />

      <ol className="space-y-10">
        {etapas.map((etapa, i) => (
          <li key={i} data-etapa className="relative">
            <span className="absolute top-1 -left-10 flex h-6 w-6 items-center justify-center rounded-full border border-forest-700/30 bg-paper text-[10px] font-semibold text-forest-700 sm:-left-14 sm:h-9 sm:w-9 sm:text-xs">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="text-xl font-normal text-forest-950">{etapa.titulo}</h3>
            <p className="mt-1.5 text-corpo leading-[1.7] text-ink-soft">{etapa.descricao}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

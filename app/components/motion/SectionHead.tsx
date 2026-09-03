"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import RevealWords from "./RevealWords";

/**
 * Abertura de seção no formato do dossiê: fio, rótulo numerado em mono e
 * título em display. O número gigante entra deslocado atrás do texto.
 *
 * O fio se desenha da esquerda para a direita no scroll — é a única coisa que
 * se move na abertura, e é o que dá a sensação de página sendo aberta.
 */
export default function SectionHead({
  numero,
  rotulo,
  titulo,
  descricao,
  escuro = false,
  className = "",
}: {
  numero: string;
  rotulo: string;
  titulo: string;
  descricao?: string;
  escuro?: boolean;
  className?: string;
}) {
  const raiz = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = raiz.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        "[data-fio]",
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 82%" },
        }
      );
      gsap.fromTo(
        "[data-numero]",
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: { trigger: node, start: "top 82%" },
        }
      );
    }, node);

    return () => ctx.revert();
  }, []);

  const corTexto = escuro ? "text-white" : "text-forest-950";
  const corSuave = escuro ? "text-white/70" : "text-ink-soft";
  const corRotulo = escuro ? "text-amber-400" : "text-amber-600";
  const corFio = escuro ? "bg-white/25" : "bg-forest-950/20";

  return (
    <div ref={raiz} className={className}>
      <div data-fio className="h-px w-full origin-left scale-x-0 bg-current opacity-100">
        <div className={`h-px w-full ${corFio}`} />
      </div>

      <div className="mt-5 flex items-baseline gap-4">
        <span data-numero className={`rotulo ${corRotulo}`}>
          {numero} / {rotulo}
        </span>
      </div>

      <RevealWords
        as="h2"
        text={titulo}
        className={`text-balance mt-4 max-w-3xl text-[clamp(2rem,4.6vw,3.5rem)] leading-[1.02] font-semibold ${corTexto}`}
      />

      {descricao && (
        <p className={`mt-5 max-w-xl text-lg leading-relaxed ${corSuave}`}>{descricao}</p>
      )}
    </div>
  );
}

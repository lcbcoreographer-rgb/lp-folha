"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import { Layers, BadgeCheck, Gauge, Scale } from "lucide-react";
import SectionHead from "./motion/SectionHead";

/**
 * Grade de quatro atributos.
 *
 * Antes era uma lista numerada — igual à seção seguinte, que também numera de
 * 01 a 04. O problema não era estético: numerar sugere ordem, e aqui não há
 * ordem nenhuma. Isto é um conjunto; a seção 02 é uma sequência. Grade para um,
 * linha para a outra.
 */
const ITEMS = [
  {
    icon: Layers,
    title: "Atuação multissetorial",
    description:
      "Do agronegócio à indústria pesada. Cada segmento tem exigências próprias, e conhecemos as delas.",
  },
  {
    icon: BadgeCheck,
    title: "Equipe técnica com ART",
    description:
      "Profissionais habilitados, com Anotação de Responsabilidade Técnica emitida para cada projeto.",
  },
  {
    icon: Gauge,
    title: "Rapidez e assertividade",
    description:
      "Processos organizados para encurtar o caminho até a licença, sem abrir mão da precisão técnica.",
  },
  {
    icon: Scale,
    title: "Conformidade legal",
    description:
      "Atuação alinhada às normativas vigentes, prevenindo multas, embargos e sanções.",
  },
];

export default function Diferenciais() {
  const grade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = grade.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animate(node.querySelectorAll("[data-item]"), {
          opacity: [0, 1],
          y: [22, 0],
          duration: 700,
          delay: stagger(90),
          ease: "outQuart",
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="diferenciais" className="bg-paper py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          rotulo="Por que a Folha"
          titulo="Uma consultoria construída para"
          destaque="resolver, não para orientar."
          descricao="Licenciamento trava por detalhe técnico. Estes quatro pontos são o que separa um protocolo aceito de um processo devolvido."
        />

        <div
          ref={grade}
          className="mx-auto mt-16 grid max-w-4xl gap-x-14 gap-y-12 sm:grid-cols-2"
        >
          {ITEMS.map((item) => (
            <article key={item.title} data-item className="text-center opacity-0 sm:text-left">
              <item.icon
                size={26}
                strokeWidth={1.4}
                className="mx-auto text-forest-700 sm:mx-0"
              />
              <h3 className="mt-4 text-xl font-normal text-forest-950">{item.title}</h3>
              <p className="mt-2.5 text-[0.95rem] leading-[1.7] text-ink-soft">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import SectionHead from "./motion/SectionHead";

const ITEMS = [
  {
    title: "Atuação multissetorial",
    description:
      "Expertise em diversos segmentos, do agronegócio à indústria, garantindo soluções personalizadas.",
  },
  {
    title: "Equipe técnica com ART",
    description:
      "Profissionais habilitados, emitindo Anotação de Responsabilidade Técnica para cada projeto.",
  },
  {
    title: "Rapidez e assertividade",
    description:
      "Processos otimizados para acelerar a obtenção de licenças, sem comprometer a qualidade e a precisão.",
  },
  {
    title: "Conformidade legal",
    description:
      "Atuação alinhada às normativas ambientais vigentes, prevenindo multas e sanções.",
  },
];

export default function Diferenciais() {
  const lista = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const node = lista.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // entra uma linha depois da outra, como um documento sendo impresso
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animate(node.querySelectorAll("[data-linha]"), {
          opacity: [0, 1],
          y: [26, 0],
          duration: 760,
          delay: stagger(110),
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
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <SectionHead
            numero="01"
            rotulo="Por que a Folha"
            titulo="Quatro razões que encurtam o processo"
            descricao="Licenciamento trava por detalhe técnico. Estes quatro pontos são o que separa um protocolo aceito de um processo devolvido."
            className="lg:sticky lg:top-32 lg:self-start"
          />

          <ol ref={lista} className="border-t border-rule">
            {ITEMS.map((item, i) => (
              <li
                key={item.title}
                data-linha
                className="group grid grid-cols-[auto_minmax(0,1fr)] gap-6 border-b border-rule py-8 opacity-0 transition-colors duration-300 hover:bg-paper-dim/60 sm:gap-10 sm:py-10"
              >
                <span className="rotulo pt-1.5 text-forest-700/50 transition-colors duration-300 group-hover:text-amber-600">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-2xl leading-tight font-semibold text-forest-950 md:text-3xl">
                    {item.title}
                  </h3>
                  <p className="mt-2.5 max-w-xl leading-relaxed text-ink-soft">
                    {item.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

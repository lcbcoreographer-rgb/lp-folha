"use client";
import { useEffect, useRef } from "react";
import { animate, stagger } from "animejs";
import SectionHead from "./motion/SectionHead";

/**
 * Quatro atributos, sem ícone.
 *
 * Os ícones lucide eram decoração: `Gauge` para "rapidez" e `Scale` para
 * "conformidade" são pictograma de banco de imagem, e ícone+título+parágrafo em
 * grade 2x2 é o componente mais reconhecível de página gerada.
 *
 * Os títulos mudaram porque dois deles não afirmavam nada que um concorrente
 * não assinasse. "Conformidade legal" não é diferencial, é obrigação.
 */
const ITEMS = [
  {
    title: "Agronegócio, indústria, porto e pátio",
    description:
      "Cada setor cai numa tipologia diferente, e é a tipologia que define quanto estudo o processo vai exigir.",
  },
  {
    title: "Equipe técnica com ART",
    description:
      "Profissionais habilitados, com Anotação de Responsabilidade Técnica emitida para cada projeto.",
  },
  {
    title: "Protocolo instruído",
    description:
      "O processo entra com estudos, plantas e documentação no formato que o órgão exige. Cada pedido de informação complementar suspende a contagem do prazo até a resposta.",
  },
  {
    title: "Adequação antes da fiscalização",
    description:
      "Multa, embargo e interdição chegam por item que já estava previsto em norma. A adequação entra no projeto, não na resposta ao auto de infração.",
  },
];

export default function Diferenciais() {
  const grade = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = grade.current;
    if (!node) return;
    const itens = node.querySelectorAll<HTMLElement>("[data-item]");

    // Os cards nascem em opacity-0 e só a animação devolvia a opacidade — com
    // prefers-reduced-motion o efeito saía de cena e a seção inteira ficava em
    // branco. Agora o caminho sem movimento revela na hora, em vez de desistir.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      itens.forEach((el) => (el.style.opacity = "1"));
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        animate(itens, {
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
          titulo="Uma consultoria construída para resolver, não para orientar."
          descricao="Licenciamento trava por detalhe técnico. Protocolo aceito e processo devolvido costumam diferir por um documento."
        />

        <div
          ref={grade}
          className="mx-auto mt-16 grid max-w-4xl gap-x-14 gap-y-12 sm:grid-cols-2"
        >
          {ITEMS.map((item) => (
            <article key={item.title} data-item className="opacity-0">
              <h3 className="text-xl font-normal text-forest-950">{item.title}</h3>
              <p className="mt-2.5 text-corpo leading-[1.7] text-ink-soft">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

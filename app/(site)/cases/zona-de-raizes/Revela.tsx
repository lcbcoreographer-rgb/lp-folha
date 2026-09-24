"use client";
import { Fragment, useEffect, useRef } from "react";

/**
 * Revelação no scroll COM failsafe, que o ScrollReveal do site não tem: lá o
 * bloco nasce com opacity 0 e depende do JS para aparecer.
 *
 * Aqui o servidor manda tudo visível. Depois de montar, e só se o bloco ainda
 * estiver fora da tela, ele é escondido (data-revela="oculto") e volta quando
 * entra. Mesmo padrão do Counter. O atributo é escrito direto no DOM: o React
 * não controla data-revela, então não há briga de hidratação.
 *
 * efeito: "subir" (padrão), "imagem" (cortina de baixo para cima) ou
 * "palavras" (título sobe palavra por palavra por trás da própria linha).
 */
export default function Revela({
  children,
  efeito = "subir",
  atraso = 0,
  className = "",
  as: Tag = "div",
}: {
  children: React.ReactNode;
  efeito?: "subir" | "imagem" | "palavras";
  atraso?: number;
  className?: string;
  as?: "div" | "li" | "h2" | "p";
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;

    el.dataset.revela = "oculto";
    const io = new IntersectionObserver(
      ([entrada]) => {
        if (!entrada.isIntersecting) return;
        io.disconnect();
        el.dataset.revela = "visivel";
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const conteudo =
    efeito === "palavras" && typeof children === "string"
      ? children.split(" ").map((p, i, todas) => (
          // o espaço fica FORA do inline-block: dentro, no fim da caixa, ele some
          <Fragment key={i}>
            <span className="palavra">
              <span style={{ "--i": i } as React.CSSProperties}>{p}</span>
            </span>
            {i < todas.length - 1 && " "}
          </Fragment>
        ))
      : children;

  const Componente = Tag as React.ElementType;
  return (
    <Componente
      ref={ref}
      data-efeito={efeito}
      className={className}
      style={{ "--atraso": `${atraso}ms` } as React.CSSProperties}
    >
      {conteudo}
    </Componente>
  );
}

"use client";
import { useEffect, useRef, useState } from "react";
import { animate } from "animejs";

/**
 * Número que conta quando entra na tela.
 *
 * Anima um objeto e escreve o resultado no estado, em vez de mexer no DOM por
 * fora: o React continua dono do que está escrito ali.
 */
export default function Counter({
  para,
  duracao = 1600,
  sufixo = "",
  prefixo = "",
  className = "",
}: {
  para: number;
  duracao?: number;
  sufixo?: string;
  prefixo?: string;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  // quem pede menos movimento ja comeca no numero final — decidir isso aqui, e
  // nao dentro do efeito, evita o render extra so para corrigir o valor
  const [valor, setValor] = useState(() =>
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? para
      : 0
  );

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const alvo = { n: 0 };
        animate(alvo, {
          n: para,
          duration: duracao,
          ease: "outExpo",
          onUpdate: () => setValor(Math.round(alvo.n)),
        });
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [para, duracao]);

  return (
    <span ref={ref} className={className}>
      {prefixo}
      {valor}
      {sufixo}
    </span>
  );
}

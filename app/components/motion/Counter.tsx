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
  // Começa no número REAL, em servidor e cliente igual. Antes começava em 0 no
  // servidor (lá não existe window), e o HTML saía com "0 anos de atuação": era
  // o que o Google indexava e o que via quem estava sem JS.
  const [valor, setValor] = useState(para);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Só zera se o número ainda estiver fora da tela — aí ninguém vê o 0 antes
    // da contagem. Se já estiver visível ao montar, fica o valor real, sem piscar.
    const r = node.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) return;
    setValor(0);

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

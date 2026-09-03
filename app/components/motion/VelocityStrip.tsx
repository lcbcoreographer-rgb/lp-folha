"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame,
  useMotionValue,
  wrap,
} from "motion/react";

/**
 * Faixa de texto que desliza sozinha e acelera com o scroll — e inverte de
 * direção quando a pessoa sobe a página.
 *
 * Serve para listar os segmentos atendidos sem virar mais uma grade de cards:
 * o movimento sugere continuidade, que é o que uma carteira de clientes é.
 */
export default function VelocityStrip({
  itens,
  baseVelocity = 2.4,
  className = "",
}: {
  itens: string[];
  baseVelocity?: number;
  className?: string;
}) {
  // WCAG 2.2.2: movimento automático e infinito precisa parar para quem pede
  const semMovimento =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const suave = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const fator = useTransform(suave, [0, 1000], [0, 4], { clamp: false });

  // -20% a -45%: a faixa tem 5 cópias, então voltar 20% cai exatamente sobre
  // a cópia seguinte e o laço é invisível
  const x = useTransform(baseX, (v) => `${wrap(-20, -45, v)}%`);

  const direcao = useRef(1);

  useAnimationFrame((_t, delta) => {
    if (semMovimento) return;
    let move = direcao.current * baseVelocity * (delta / 1000);
    // scroll para cima empurra a faixa para o outro lado: o movimento responde
    // à pessoa em vez de ignorá-la
    if (fator.get() < 0) direcao.current = -1;
    else if (fator.get() > 0) direcao.current = 1;
    move += direcao.current * move * fator.get();
    baseX.set(baseX.get() + move);
  });

  const texto = itens.join("  ·  ");

  return (
    <div aria-hidden className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="inline-flex" style={{ x }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <span key={i} className="block pr-8">
            {texto}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

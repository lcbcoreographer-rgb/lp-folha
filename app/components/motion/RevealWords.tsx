"use client";
import { motion, type Variants } from "motion/react";

/**
 * Título que sobe palavra a palavra por trás de uma máscara.
 *
 * A máscara é o `overflow-hidden` de cada palavra: ela não aparece de baixo da
 * tela, aparece de dentro da própria linha — é o que dá a sensação de texto
 * sendo composto, e não de coisa deslizando.
 *
 * Sem rotação 3D: `rotateX` com `perspective` é a assinatura de movimento mais
 * reconhecível de landing gerada. A máscara sozinha já conta a história.
 */
export default function RevealWords({
  text,
  className = "",
  delay = 0,
  as: Tag = "h2",
}: {
  text: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "p";
}) {
  const palavras = text.split(" ");

  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.055, delayChildren: delay } },
  };

  const palavra: Variants = {
    hidden: { y: "110%", opacity: 0 },
    visible: {
      y: "0%",
      opacity: 1,
      transition: { type: "spring", damping: 18, stiffness: 120 },
    },
  };

  const Componente = motion[Tag];

  return (
    <Componente
      className={className}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-12%" }}
    >
      {palavras.map((p, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span variants={palavra} className="inline-block origin-bottom">
            {p}
            {i < palavras.length - 1 && " "}
          </motion.span>
        </span>
      ))}
    </Componente>
  );
}

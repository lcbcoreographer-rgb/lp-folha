"use client";
import { motion, type Variants } from "motion/react";

/**
 * Abertura de seção: rótulo discreto, título em serif de peso normal e uma
 * frase destacada em verde dentro do próprio título.
 *
 * O destaque dentro do título é o que dá tom institucional sem precisar de
 * corpo grande: a ênfase vem da cor, não do tamanho. Por isso o título ficou
 * em peso 400 — bold em serif grande lê como anúncio, não como instituição.
 */
export default function SectionHead({
  rotulo,
  titulo,
  destaque,
  descricao,
  escuro = false,
  centralizado = true,
  className = "",
}: {
  rotulo: string;
  titulo: string;
  /** trecho do título que recebe a cor de ênfase */
  destaque?: string;
  descricao?: string;
  escuro?: boolean;
  centralizado?: boolean;
  className?: string;
}) {
  const container: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12 } },
  };
  const item: Variants = {
    hidden: { y: 18, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.7, ease: [0.25, 1, 0.5, 1] } },
  };

  const corTitulo = escuro ? "text-white" : "text-forest-950";
  const corSuave = escuro ? "text-white/65" : "text-ink-soft";
  const corRotulo = escuro ? "text-white/45" : "text-ink-soft/70";
  const corDestaque = escuro ? "text-forest-600" : "text-forest-700";

  return (
    <motion.div
      className={`${centralizado ? "mx-auto text-center" : ""} ${className}`}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
    >
      <motion.p
        variants={item}
        className={`text-[0.7rem] font-semibold tracking-[0.2em] uppercase ${corRotulo}`}
      >
        {rotulo}
      </motion.p>

      <motion.h2
        variants={item}
        className={`text-balance mt-5 text-[clamp(1.65rem,3vw,2.5rem)] leading-[1.22] font-normal ${corTitulo} ${
          centralizado ? "mx-auto max-w-3xl" : "max-w-2xl"
        }`}
      >
        {titulo}
        {destaque && <span className={corDestaque}> {destaque}</span>}
      </motion.h2>

      {descricao && (
        <motion.p
          variants={item}
          className={`mt-5 text-base leading-[1.75] ${corSuave} ${
            centralizado ? "mx-auto max-w-2xl" : "max-w-xl"
          }`}
        >
          {descricao}
        </motion.p>
      )}
    </motion.div>
  );
}

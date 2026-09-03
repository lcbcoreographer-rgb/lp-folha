"use client";
import { motion } from "motion/react";

/**
 * Conteúdo que entra levemente desfocado e resolve uma vez.
 *
 * Antes o desfoque era preso ao progresso do scroll, nos dois sentidos: rolar de
 * volta para reler uma norma reaplicava 14px de blur em cima do texto legal — e
 * reler citação de lei é exatamente o que o visitante faz nessa página. Agora
 * resolve uma vez e fica resolvido, e o blur caiu de 14px para 6px.
 */
export default function FocalReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-12%" }}
      transition={{ duration: 0.75, ease: [0.25, 1, 0.5, 1] }}
    >
      {children}
    </motion.div>
  );
}

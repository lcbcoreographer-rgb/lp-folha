"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

/**
 * Conteúdo que entra desfocado e distante e resolve conforme sobe na tela.
 *
 * É a promessa da Folha em forma de movimento: o processo começa opaco e vai
 * ficando claro. Por isso o desfoque é o eixo principal, não a opacidade.
 */
export default function FocalReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "start 0.35"],
  });

  // mola no progresso: sem ela o desfoque acompanha o dedo e fica nervoso
  const suave = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });

  const blur = useTransform(suave, [0, 1], [14, 0]);
  const filter = useTransform(blur, (b) => `blur(${b}px)`);
  const opacity = useTransform(suave, [0, 0.6], [0, 1]);
  const y = useTransform(suave, [0, 1], [56, 0]);
  const scale = useTransform(suave, [0, 1], [0.965, 1]);

  return (
    <motion.div ref={ref} style={{ filter, opacity, y, scale }} className={className}>
      {children}
    </motion.div>
  );
}

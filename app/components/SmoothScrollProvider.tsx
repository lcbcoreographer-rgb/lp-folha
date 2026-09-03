"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/**
 * Scroll suave (Lenis) e o GSAP amarrados ao mesmo relógio.
 *
 * Sem isso, o ScrollTrigger lê a posição nativa da página enquanto o Lenis
 * desenha outra: as animações disparam antes ou depois do elemento aparecer.
 * A correção é uma só — o Lenis avisa o ScrollTrigger a cada quadro, e o GSAP
 * passa a comandar o requestAnimationFrame dos dois.
 */
export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    // quem prefere menos movimento não ganha scroll sequestrado
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    gsap.registerPlugin(ScrollTrigger);

    if (semMovimento) {
      ScrollTrigger.refresh();
      return;
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenis.on("scroll", ScrollTrigger.update);

    // o GSAP já roda um rAF; usar o dele evita dois loops brigando pelo quadro
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    function onAnchorClick(e: MouseEvent) {
      const target = (e.target as HTMLElement)?.closest('a[href^="#"], a[href^="/#"]');
      if (!target) return;
      const href = target.getAttribute("href");
      if (!href) return;
      const hash = href.startsWith("/#") ? href.slice(1) : href;
      if (hash === "#") return;
      const el = document.querySelector(hash);
      if (!el) return; // âncora de outra página: deixa o Next navegar
      e.preventDefault();
      lenis.scrollTo(el as HTMLElement, { offset: -84 });
    }
    document.addEventListener("click", onAnchorClick);

    return () => {
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return <>{children}</>;
}

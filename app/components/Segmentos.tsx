"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import SectionHead from "./motion/SectionHead";
import VelocityStrip from "./motion/VelocityStrip";

const SEGMENTS = [
  {
    name: "Pátio de caminhões",
    detalhe: "Licença de operação, outorga e plano de gerenciamento de resíduos.",
    img: "https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?w=1200&q=80",
  },
  {
    name: "Armazenagem de fertilizantes",
    detalhe: "Estudos de risco, licença prévia e adequação de estruturas.",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
  },
  {
    name: "Empreendimentos náuticos",
    detalhe: "Autorização ambiental, área de influência e supressão vegetal.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
  },
  {
    name: "Portos",
    detalhe: "Licenciamento de grande porte, monitoramento e condicionantes.",
    img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
  },
  {
    name: "Indústrias diversas",
    detalhe: "Efluentes, emissões atmosféricas e renovação de licença.",
    img: "https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?w=1200&q=80",
  },
];

export default function Segmentos() {
  const secao = useRef<HTMLDivElement>(null);
  const trilho = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const nodeSecao = secao.current;
    const nodeTrilho = trilho.current;
    if (!nodeSecao || !nodeTrilho) return;

    // sem rolagem horizontal em tela pequena nem para quem pede menos
    // movimento: ali a lista vertical já resolve e o pin atrapalha
    const semMovimento = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const telaPequena = window.matchMedia("(max-width: 1023px)").matches;
    if (semMovimento || telaPequena) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distancia = () => nodeTrilho.scrollWidth - window.innerWidth + 96;

      gsap.to(nodeTrilho, {
        x: () => -distancia(),
        ease: "none",
        scrollTrigger: {
          trigger: nodeSecao,
          start: "top top",
          // a altura do pin é a distância horizontal: o gesto vira 1:1
          end: () => `+=${distancia()}`,
          pin: true,
          scrub: 0.8,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, nodeSecao);

    return () => ctx.revert();
  }, []);

  return (
    <section id="segmentos" className="bg-forest-950 text-white">
      <div ref={secao} className="overflow-hidden py-20 lg:h-screen lg:py-0">
        <div className="container mx-auto px-4 pt-4 sm:px-6 lg:flex lg:h-full lg:flex-col lg:justify-center lg:px-8">
          <SectionHead
            rotulo="Onde atuamos"
            titulo="Cinco frentes,"
            destaque="um mesmo rigor."
            escuro
          />

          <VelocityStrip
            itens={SEGMENTS.map((s) => s.name)}
            className="mt-8 mb-10 select-none text-3xl font-semibold tracking-tight text-white/10 md:text-5xl"
          />

          {/* trilho: horizontal no desktop (puxado pelo GSAP), empilhado no resto */}
          <div
            ref={trilho}
            className="grid gap-5 sm:grid-cols-2 lg:flex lg:w-max lg:gap-6"
          >
            {SEGMENTS.map((seg, i) => (
              <article
                key={seg.name}
                className="group relative flex h-[360px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 lg:w-[360px] lg:shrink-0"
              >
                <Image
                  src={seg.img}
                  alt=""
                  fill
                  unoptimized
                  sizes="(max-width: 1024px) 100vw, 380px"
                  className="object-cover opacity-35 transition-all duration-700 group-hover:scale-105 group-hover:opacity-55"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-forest-950 via-forest-950/60 to-transparent" />

                <div className="relative z-10 p-7">
                  <span className="text-[0.65rem] font-semibold tracking-[0.18em] text-amber-400 uppercase">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-xl leading-snug font-normal text-white">
                    {seg.name}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/65">{seg.detalhe}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

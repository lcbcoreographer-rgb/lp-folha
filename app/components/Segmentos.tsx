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
    detalhe: "Estudo de análise de risco e licença prévia antes da obra.",
    img: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1200&q=80",
  },
  {
    name: "Empreendimentos náuticos",
    detalhe: "Autorização ambiental, área de influência e supressão vegetal.",
    img: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
  },
  {
    name: "Portos",
    detalhe: "O enquadramento entre IAT e IBAMA é definido caso a caso, e as condicionantes voltam a cada renovação.",
    img: "https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1200&q=80",
  },
  {
    name: "Indústria em operação",
    detalhe: "Efluentes, emissões atmosféricas, resíduos sólidos e renovação da licença de operação.",
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
      // scrollWidth ja inclui o padding do proprio trilho nas duas pontas, entao
      // levar o trilho por (scrollWidth - janela) encosta a borda direita do
      // ultimo card no fim da tela. A versao anterior somava 96 de folga e
      // ignorava o deslocamento inicial — sobrava card cortado.
      const distancia = () => Math.max(0, nodeTrilho.scrollWidth - window.innerWidth);

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
      <div
        ref={secao}
        className="overflow-hidden py-20 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
      >
        <div className="container mx-auto px-4 pt-4 sm:px-6 lg:px-8">
          <SectionHead
            rotulo="Onde atuamos"
            titulo="A exigência muda conforme o setor."
            escuro
          />
        </div>

        {/* Listava os mesmos cinco nomes que os cards mostram logo abaixo, a 10%
            de opacidade. Passa a nomear os instrumentos do rito — informação que
            não está em outro lugar da página — e sobe para 18% para ser legível. */}
        <VelocityStrip
          itens={[
            "Licença prévia",
            "Licença de instalação",
            "Licença de operação",
            "Renovação",
            "Outorga de uso da água",
            "Estudo de análise de risco",
            "Plano de gerenciamento de resíduos",
          ]}
          className="mt-8 mb-10 select-none text-2xl font-normal tracking-tight text-white/[0.18] md:text-4xl"
        />

        {/* O trilho sangra até a borda em vez de viver dentro do container.
            Preso ao container de 1024px, o ultimo card ficava 36px cortado para
            sempre: a conta de distancia usava a largura da janela, mas o trilho
            comecava deslocado 132px para dentro. Agora ele comeca na margem e a
            conta bate. */}
        <div className="px-4 sm:px-6 lg:px-0">
          <div
            ref={trilho}
            className="grid gap-5 sm:grid-cols-2 lg:flex lg:w-max lg:gap-6 lg:pr-[8vw] lg:pl-[max(2rem,calc((100vw-1024px)/2+2rem))]"
          >
            {SEGMENTS.map((seg) => (
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
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                />
                {/* véu só no pé do card, onde o texto pousa — o resto da foto fica limpo */}
                <div className="absolute inset-0 bg-[linear-gradient(to_top,rgba(30,44,21,0.93)_18%,rgba(30,44,21,0.45)_48%,transparent_78%)]" />

                <div className="relative z-10 p-7">
                  <h3 className="text-xl leading-snug font-normal text-white">
                    {seg.name}
                  </h3>
                  <p className="mt-2 text-base leading-[1.6] text-white/85">{seg.detalhe}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

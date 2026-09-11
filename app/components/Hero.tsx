import Image from "next/image";
import ScrollReveal from "./ScrollReveal";
import WhatsAppCTAButton from "./WhatsAppCTAButton";
import LogoMarquee from "./motion/LogoMarquee";
import { LOGOS_CLIENTES } from "../lib/clientes";

export default function Hero() {
  return (
    <section id="hero" className="relative overflow-hidden bg-forest-950">
      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
        alt="Trilha em floresta nativa preservada"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(30,44,21,0.93),rgba(30,44,21,0.5)_45%,rgba(30,44,21,0.05))]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(30,44,21,0.88),transparent)]" />

      <div className="relative z-10 container mx-auto flex min-h-[calc(100svh-6.5rem)] flex-col justify-end px-4 pt-32 pb-14 sm:px-6 lg:px-8">
        <ScrollReveal direction="none">
          <p className="rotulo text-white/75">Licenciamento ambiental estratégico</p>
        </ScrollReveal>

        {/* Sem revelação: é o LCP. Nascer com opacity 0 esperando JS arrisca
            deixar o título principal invisível. */}
        <h1 className="text-balance mt-6 max-w-[24ch] text-[clamp(2.1rem,4.6vw,3.6rem)] leading-[1.14] font-light text-white">
          Regularização ambiental acompanhando sua operação, do licenciamento à renovação.
        </h1>

        <ScrollReveal direction="up" delay={300}>
          <p className="mt-7 max-w-xl text-corpo leading-[1.7] text-white/85">
            Há 13 anos, a Folha atua junto aos órgãos ambientais para sua empresa operar,
            expandir e crescer sem depender de sorte com prazos.
          </p>

          <div className="mt-9">
            <WhatsAppCTAButton
              eventLabel="hero_atendimento"
              className="inline-flex items-center rounded-full bg-amber-600 px-8 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700"
            >
              Falar com especialista
            </WhatsAppCTAButton>
          </div>
        </ScrollReveal>

      </div>

      {/* Faixa clara no pé da seção Home: os logos precisam de fundo claro para
          manter o contraste interno (ver LogoMarquee). */}
      {LOGOS_CLIENTES.length > 0 && (
        <div className="relative z-10 bg-paper py-8">
          <LogoMarquee logos={LOGOS_CLIENTES} />
        </div>
      )}
    </section>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import RevealWords from "./motion/RevealWords";
import ScrollReveal from "./ScrollReveal";
import WhatsAppCTAButton from "./WhatsAppCTAButton";

/**
 * Capa do dossiê: a foto ocupa a página inteira, escurecida, e por cima vem
 * uma ficha técnica — rótulos em mono, fios de 1px e o título em display.
 *
 * A ideia é o oposto do hero de agência: nada centralizado, nada de card
 * flutuante. O texto se apoia na margem esquerda como um documento.
 */
const FICHA = [
  { chave: "Atuação", valor: "Paraná" },
  { chave: "Registro", valor: "Equipe com ART" },
  { chave: "Escopo", valor: "Licenciamento completo" },
];

export default function Hero() {
  return (
    <section id="hero" className="relative min-h-[100svh] overflow-hidden bg-forest-950">
      <Image
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
        alt="Trilha em floresta nativa preservada"
        fill
        priority
        unoptimized
        sizes="100vw"
        className="object-cover"
      />
      {/* Véu só onde o texto pousa. A versão anterior somava um degradê forte a
          uma camada chapada e apagava a floresta inteira — o verde virava fundo
          liso e a foto não servia para nada. */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(5,46,22,0.94),rgba(5,46,22,0.55)_45%,rgba(5,46,22,0.05))]" />
      <div className="absolute inset-x-0 bottom-0 h-1/2 bg-[linear-gradient(to_top,rgba(5,46,22,0.85),transparent)]" />

      <div className="relative z-10 container mx-auto flex min-h-[100svh] flex-col justify-end px-4 pt-32 pb-14 sm:px-6 lg:px-8">
        <ScrollReveal direction="none">
          <div className="fio-claro" />
          <p className="rotulo mt-4 text-amber-400">
            Folha Soluções Ambientais — Dossiê 2026
          </p>
        </ScrollReveal>

        <RevealWords
          as="h1"
          delay={0.15}
          text="Licenciamento ambiental completo para quem não pode parar"
          className="text-balance mt-6 max-w-[16ch] text-[clamp(2.75rem,7.5vw,6.5rem)] leading-[0.95] font-semibold text-white"
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <ScrollReveal direction="up" delay={420}>
            <p className="max-w-lg text-lg leading-relaxed text-white/75">
              Indústria, agronegócio, portos e pátios. Assumimos o processo inteiro —
              do diagnóstico ao protocolo no órgão ambiental — para a sua operação
              seguir funcionando enquanto a licença anda.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <WhatsAppCTAButton
                eventLabel="hero_atendimento"
                message="Olá, quero solicitar atendimento especializado em licenciamento ambiental"
                className="group inline-flex items-center gap-3 rounded-none border border-amber-500 bg-amber-500 px-8 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-amber-400"
              >
                Falar com um especialista
              </WhatsAppCTAButton>
              <Link
                href="/#como-funciona"
                className="rotulo underline-swipe text-white/70 transition-colors hover:text-white"
              >
                Ver como funciona
              </Link>
            </div>
          </ScrollReveal>

          {/* ficha técnica: o detalhe que faz parecer documento, não anúncio */}
          <ScrollReveal direction="up" delay={560}>
            <dl className="border-t border-white/20">
              {FICHA.map((item) => (
                <div
                  key={item.chave}
                  className="flex items-baseline justify-between gap-6 border-b border-white/10 py-3.5"
                >
                  <dt className="rotulo text-white/50">{item.chave}</dt>
                  <dd className="text-right text-sm font-medium text-white">{item.valor}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        <div className="mt-12 flex items-center gap-3 text-white/40">
          <ArrowDown size={15} className="animate-bounce" />
          <span className="rotulo">Role para continuar</span>
        </div>
      </div>
    </section>
  );
}

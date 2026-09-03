import Image from "next/image";
import Link from "next/link";
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
  { chave: "Responsável técnico", valor: "Registro no CREA-PR" },
  { chave: "Escopo", valor: "LP, LI, LO e renovação" },
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
          <p className="text-[0.7rem] font-semibold tracking-[0.2em] text-white/55 uppercase">
            Licenciamento ambiental · Paraná
          </p>
        </ScrollReveal>

        {/* Sem revelação: é o LCP da página. Nascer com opacity 0 esperando JS
            arrisca deixar o título principal invisível — e animar o h1 acima da
            dobra é o proprio tique de landing gerada. */}
        <h1 className="text-balance mt-6 max-w-[26ch] text-[clamp(2.15rem,4.9vw,3.8rem)] leading-[1.14] font-normal text-white">
          Seu processo entra no órgão sem voltar por exigência
        </h1>

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
          <ScrollReveal direction="up" delay={420}>
            <p className="max-w-lg text-corpo leading-[1.7] text-white/85">
              Indústria, agronegócio, portos e pátios. Assumimos o processo inteiro —
              do diagnóstico ao protocolo no órgão ambiental — para a sua operação
              seguir funcionando enquanto a licença anda.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-5">
              <WhatsAppCTAButton
                eventLabel="hero_atendimento"
                message="Olá, quero solicitar atendimento especializado em licenciamento ambiental"
                className="group inline-flex items-center gap-3 rounded-full bg-amber-600 px-8 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700"
              >
                Solicitar diagnóstico
              </WhatsAppCTAButton>
              <Link
                href="/#como-funciona"
                className="text-sm text-white/70 underline-swipe transition-colors hover:text-white"
              >
                Ver como funciona
              </Link>
            </div>
          </ScrollReveal>

          {/* ficha técnica: o detalhe que faz parecer documento, não anúncio */}
          <ScrollReveal direction="up" delay={560}>
            <dl className="flex flex-wrap gap-x-10 gap-y-4 lg:justify-end">
              {FICHA.map((item) => (
                <div key={item.chave}>
                  <dt className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/45 uppercase">
                    {item.chave}
                  </dt>
                  <dd className="mt-1 text-sm text-white/90">{item.valor}</dd>
                </div>
              ))}
            </dl>
          </ScrollReveal>
        </div>

        <div className="mt-12">
          <a
            href="tel:+554134231690"
            className="text-[0.65rem] font-semibold tracking-[0.18em] text-white/70 uppercase transition-colors hover:text-white"
          >
            (41) 3423-1690
          </a>
        </div>
      </div>
    </section>
  );
}

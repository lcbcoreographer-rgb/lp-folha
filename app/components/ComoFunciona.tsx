import RevealWords from "./motion/RevealWords";
import FocalReveal from "./motion/FocalReveal";
import ProcessLine from "./motion/ProcessLine";
import Counter from "./motion/Counter";

const ETAPAS = [
  {
    titulo: "Diagnóstico do empreendimento",
    descricao:
      "Levantamos a atividade, o porte e a localização para saber exatamente quais licenças o seu caso exige — e quais não exige.",
  },
  {
    titulo: "Documentação e estudos",
    descricao:
      "Reunimos plantas, memoriais e estudos ambientais. É aqui que a maioria dos processos trava, e é aqui que a nossa equipe assume.",
  },
  {
    titulo: "Protocolo no órgão ambiental",
    descricao:
      "Entrada no IAT, prefeitura ou órgão competente, com acompanhamento de cada exigência e prazo.",
  },
  {
    titulo: "Licença emitida",
    descricao:
      "Você recebe a licença e o calendário de renovação. Avisamos antes de vencer, para a regularidade não depender de memória.",
  },
];

export default function ComoFunciona() {
  return (
    <section id="como-funciona" className="bg-paper py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1fr)] lg:gap-20">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <span className="text-xs font-semibold tracking-[0.16em] text-amber-600 uppercase">
              Como funciona
            </span>
            <RevealWords
              as="h2"
              text="Do papel parado à licença na mão"
              className="text-balance mt-3 text-3xl font-extrabold text-forest-950 md:text-4xl"
            />
            <FocalReveal>
              <p className="mt-5 max-w-md text-lg leading-relaxed text-ink-soft">
                Licenciamento não é um formulário: é uma sequência de exigências que precisa
                ser cumprida na ordem certa. Nós percorremos essa sequência por você.
              </p>

              <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-forest-950/10 pt-8">
                <div>
                  <dt className="text-3xl font-extrabold text-forest-800 md:text-4xl">
                    <Counter para={12} sufixo="+" />
                  </dt>
                  <dd className="mt-1 text-sm text-ink-soft">anos de atuação no Paraná</dd>
                </div>
                <div>
                  <dt className="text-3xl font-extrabold text-forest-800 md:text-4xl">
                    <Counter para={4} />
                  </dt>
                  <dd className="mt-1 text-sm text-ink-soft">etapas até a licença</dd>
                </div>
              </dl>
            </FocalReveal>
          </div>

          <ProcessLine etapas={ETAPAS} />
        </div>
      </div>
    </section>
  );
}

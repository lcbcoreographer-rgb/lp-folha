import SectionHead from "./motion/SectionHead";
import FocalReveal from "./motion/FocalReveal";

const LEGISLACAO = [
  {
    norma: "CONAMA nº 237/1997",
    tipo: "Resolução",
    texto: "Estabelece os procedimentos e critérios para o licenciamento ambiental.",
  },
  {
    norma: "Lei nº 12.651/2012",
    tipo: "Código Florestal",
    texto: "Define as regras de proteção da vegetação nativa e das áreas de reserva.",
  },
  {
    norma: "Lei nº 12.305/2010",
    tipo: "Resíduos Sólidos",
    texto: "Orienta a gestão integrada e o plano de gerenciamento de resíduos.",
  },
  {
    norma: "Lei nº 9.605/1998",
    tipo: "Crimes Ambientais",
    texto: "Dispõe sobre as sanções penais e administrativas por conduta lesiva.",
  },
];

export default function Legislacao() {
  return (
    <section id="legislacao" className="bg-paper-dim py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          rotulo="Segurança jurídica"
          titulo="O que sustenta cada processo."
          descricao="Conformidade não é opinião: é um conjunto de normas específicas. Estas são as que mais pesam no dia a dia de quem opera no Paraná."
        />

        {/* tabela de normas: o formato mais honesto para este conteúdo */}
        <FocalReveal className="mt-14">
          <div className="mx-auto max-w-3xl">
            {LEGISLACAO.map((item) => (
              <article
                key={item.norma}
                className="grid gap-1.5 border-b border-rule py-7 md:grid-cols-[minmax(0,13rem)_minmax(0,1fr)] md:gap-10"
              >
                <div>
                  <p className="text-[0.85rem] font-medium text-forest-700 tabular-nums">{item.norma}</p>
                  <p className="mt-1 text-[0.7rem] font-semibold tracking-[0.14em] text-ink-soft/60 uppercase">{item.tipo}</p>
                </div>
                <p className="max-w-2xl leading-[1.7] text-ink">{item.texto}</p>
              </article>
            ))}
          </div>

          <p className="mx-auto mt-10 max-w-2xl text-center leading-[1.75] text-ink-soft">
            Interpretamos e aplicamos essas legislações no contexto do seu empreendimento —
            industrial, portuário ou de agronegócio — para que a licença saia e continue
            válida.
          </p>
        </FocalReveal>
      </div>
    </section>
  );
}

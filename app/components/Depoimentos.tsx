import SectionHead from "./motion/SectionHead";
import FocalReveal from "./motion/FocalReveal";

/**
 * ATENÇÃO — conteúdo pendente de verificação.
 * "João da Silva" e "Maria Oliveira" vieram do commit inicial do repositório e
 * não foram confirmados como depoimentos reais. Antes de publicar: autorização
 * por escrito, nome, cargo e razão social corretos.
 *
 * A caixa saiu. Aspas em âmbar no meio do texto viravam glifo decorativo, e o
 * card arredondado contradizia o resto da página, que é fio de 1px e tabela sem
 * raio. A citação agora se sustenta pelo tamanho, como em Legislação.
 */
const TESTIMONIALS = [
  {
    name: "João da Silva",
    company: "Transportadora Veloz",
    text: "A Folha foi crucial para a regularização do nosso pátio. Processo rápido e equipe muito competente.",
  },
  {
    name: "Maria Oliveira",
    company: "Engenharia Ambiental",
    text: "Conseguimos nossa licença para armazenagem de fertilizantes em tempo recorde. A expertise deles fez toda a diferença.",
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="bg-paper py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead rotulo="Depoimentos" titulo="Quem já passou pelo processo." />

        <div className="mx-auto mt-14 max-w-3xl">
          {TESTIMONIALS.map((t) => (
            <FocalReveal key={t.name} className="border-b border-rule py-10 first:border-t">
              <figure>
                <blockquote className="text-[clamp(1.15rem,2vw,1.5rem)] leading-[1.5] font-normal text-forest-950">
                  {t.text}
                </blockquote>
                <figcaption className="mt-5 text-sm text-ink-soft">
                  {t.name} · {t.company}
                </figcaption>
              </figure>
            </FocalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

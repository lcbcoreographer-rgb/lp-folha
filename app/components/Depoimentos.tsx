import SectionHead from "./motion/SectionHead";
import FocalReveal from "./motion/FocalReveal";

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
        <SectionHead
          rotulo="Depoimentos"
          titulo="Quem já passou"
          destaque="pelo processo."
        />

        <div className="mx-auto mt-14 grid max-w-5xl gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t) => (
            <FocalReveal key={t.name} className="rounded-2xl border border-rule bg-paper-dim/60 p-8 md:p-10">
              <figure className="flex h-full flex-col justify-between">
                {/* aspas em display grande: a citação é o elemento, não um card */}
                <blockquote className="text-xl leading-[1.5] font-normal text-forest-950">
                  <span className="text-amber-500">“</span>
                  {t.text}
                  <span className="text-amber-500">”</span>
                </blockquote>
                <figcaption className="mt-10 border-t border-rule pt-5">
                  <p className="font-medium text-ink">{t.name}</p>
                  <p className="rotulo mt-1 text-ink-soft/70">{t.company}</p>
                </figcaption>
              </figure>
            </FocalReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

import SectionHead from "./motion/SectionHead";
import ScrollReveal from "./ScrollReveal";

const NORMAS = ["CONAMA 237/1997", "Código Florestal", "PNRS", "Lei de Crimes Ambientais"];

export default function Legislacao() {
  return (
    <section id="legislacao" className="bg-paper-dim py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead
          titulo="Conhecimento técnico que vira segurança jurídica para o seu negócio"
          descricao="Navegar o sistema de leis ambientais exige conhecimento aprofundado e atualização constante. A Folha interpreta e aplica as principais legislações federais e estaduais para que sua empresa opere com tranquilidade jurídica e operacional."
        />

        <ul className="mx-auto mt-14 flex max-w-3xl flex-wrap justify-center gap-3">
          {NORMAS.map((norma, i) => (
            <ScrollReveal as="li" key={norma} direction="up" delay={i * 80}>
              <span className="inline-block rounded-full border border-forest-900/25 px-5 py-2.5 text-[0.95rem] font-medium text-forest-900">
                {norma}
              </span>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

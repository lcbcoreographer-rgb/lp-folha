import ScrollReveal from "./ScrollReveal";

export default function Posicionamento() {
  return (
    <section id="posicionamento" className="bg-paper py-24 md:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-20">
          <ScrollReveal direction="up">
            <h2 className="text-balance text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.15] font-light text-forest-900">
              Crescimento seguro para operar, expandir e conservar.
            </h2>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={120}>
            <div className="space-y-5 lg:pt-2">
              <p className="text-[clamp(1.15rem,1.6vw,1.35rem)] leading-[1.55] text-forest-900">
                Meio ambiente não é o que trava o seu negócio. É o que garante que ele continue
                operando amanhã e daqui a dez anos.
              </p>
              <p className="text-corpo leading-[1.7] text-ink-soft">
                De indústrias com terminal portuário a operações agro, negócios logísticos e
                imobiliários, estamos preparados para atuar na linha de frente e garantir
                continuidade de licenciamento para o seu negócio.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

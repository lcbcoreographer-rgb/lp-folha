import ScrollReveal from "./ScrollReveal";
import FormTriggerButton from "./FormTriggerButton";

export default function CTAFinal() {
  return (
    <section id="cta-final" className="py-24 md:py-28 bg-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <h2 className="text-3xl md:text-4xl font-extrabold text-forest-900 text-balance">
            Pronto para regularizar seu empreendimento?
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-ink-soft">
            Evite multas e paralisações. Entre em contato conosco e dê o
            primeiro passo para a total conformidade ambiental do seu negócio.
          </p>
          <div className="mt-9">
            <FormTriggerButton className="inline-flex items-center rounded-full bg-amber-500 px-10 py-4 text-base font-semibold text-white shadow-lg shadow-amber-900/10 transition-all duration-300 hover:bg-amber-600 hover:-translate-y-1 hover:shadow-xl">
              Solicitar Orçamento
            </FormTriggerButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

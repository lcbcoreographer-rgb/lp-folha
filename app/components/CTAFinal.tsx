import ScrollReveal from "./ScrollReveal";
import WhatsAppCTAButton from "./WhatsAppCTAButton";

export default function CTAFinal() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-forest-950 py-28 md:py-36">
      <div className="relative z-10 container mx-auto px-4 text-center sm:px-6 lg:px-8">
        <ScrollReveal direction="up">
          <h2 className="text-balance mx-auto max-w-[22ch] text-[clamp(1.9rem,3.6vw,3rem)] leading-[1.15] font-light text-white">
            Pronto para crescer com segurança?
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={150}>
          <p className="mx-auto mt-6 max-w-xl text-corpo leading-[1.7] text-white/80">
            Quanto antes a regularização entra no planejamento, menos ela custa. Fale com a Folha
            e descubra o caminho mais direto para a continuidade da sua operação.
          </p>

          <div className="mt-10">
            <WhatsAppCTAButton
              eventLabel="cta_final"
              className="inline-flex items-center rounded-full bg-amber-600 px-9 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700"
            >
              Falar com um especialista
            </WhatsAppCTAButton>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

import RevealWords from "./motion/RevealWords";
import ScrollReveal from "./ScrollReveal";
import WhatsAppCTAButton from "./WhatsAppCTAButton";

export default function CTAFinal() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-forest-950 py-28 md:py-36">
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-center text-[0.7rem] font-semibold tracking-[0.2em] text-white/45 uppercase">
          Próximo passo
        </p>

        <RevealWords
          as="h2"
          text="Pronto para regularizar seu empreendimento?"
          className="text-balance mx-auto mt-5 max-w-[24ch] text-center text-[clamp(1.65rem,3vw,2.5rem)] leading-[1.22] font-normal text-white"
        />

        <ScrollReveal direction="up" delay={200}>
          <p className="mx-auto mt-6 max-w-xl text-center text-corpo leading-[1.7] text-white/80">
            Conte o que a sua operação faz e onde ela está. Devolvemos quais licenças o
            seu caso exige e o caminho mais curto até elas.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <WhatsAppCTAButton
              eventLabel="cta_final"
              message="Olá, quero regularizar meu empreendimento e gostaria de falar com um especialista"
              className="inline-flex items-center gap-3 rounded-full bg-amber-600 px-9 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700"
            >
              Solicitar diagnóstico
            </WhatsAppCTAButton>
            <span className="rotulo text-white/45">Resposta no mesmo dia útil</span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

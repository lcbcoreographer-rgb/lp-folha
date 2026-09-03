import RevealWords from "./motion/RevealWords";
import ScrollReveal from "./ScrollReveal";
import WhatsAppCTAButton from "./WhatsAppCTAButton";

export default function CTAFinal() {
  return (
    <section id="cta-final" className="relative overflow-hidden bg-forest-950 py-28 md:py-36">
      {/* número de seção gigante, cortado pela borda: fecha o dossiê */}
      <span
        aria-hidden
        className="marca-secao pointer-events-none absolute -right-6 -bottom-14 text-[26vw] text-white/[0.04] select-none"
      >
        06
      </span>

      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="fio-claro max-w-4xl" />
        <p className="rotulo mt-4 text-amber-400">06 / Próximo passo</p>

        <RevealWords
          as="h2"
          text="Pronto para regularizar seu empreendimento?"
          className="text-balance mt-5 max-w-[18ch] text-[clamp(2.25rem,6vw,4.75rem)] leading-[0.98] font-semibold text-white"
        />

        <ScrollReveal direction="up" delay={200}>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-white/70">
            Conte o que a sua operação faz e onde ela está. Devolvemos quais licenças o
            seu caso exige e o caminho mais curto até elas.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-6">
            <WhatsAppCTAButton
              eventLabel="cta_final"
              message="Olá, quero regularizar meu empreendimento e gostaria de falar com um especialista"
              className="inline-flex items-center gap-3 border border-amber-500 bg-amber-500 px-9 py-4 text-base font-semibold text-white transition-all duration-300 hover:bg-transparent hover:text-amber-400"
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

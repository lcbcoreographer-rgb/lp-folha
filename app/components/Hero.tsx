import { ShieldCheck, Zap, ChevronDown } from "lucide-react";
import ParallaxImage from "./ParallaxImage";
import ScrollReveal from "./ScrollReveal";
import FormTriggerButton from "./FormTriggerButton";

export default function Hero() {
  return (
    <section id="hero" className="relative">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&q=80"
        alt="Trilha em floresta nativa preservada"
        priority
        strength={90}
        className="min-h-[94vh] flex items-center"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-forest-950/95 via-forest-950/65 to-forest-950/40" />
        <div className="absolute inset-0 bg-forest-900/10 mix-blend-multiply" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="max-w-2xl">
            <ScrollReveal direction="up">
              <span className="inline-flex items-center rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                Licenciamento Ambiental · Paraná
              </span>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={100}>
              <h1 className="text-balance mt-6 text-4xl md:text-6xl font-extrabold leading-[1.08] text-white">
                Licenciamento Ambiental completo para diferentes segmentos no Paraná
              </h1>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={200}>
              <p className="mt-6 max-w-xl text-lg text-white/80">
                Navegue pela burocracia com especialistas. Garantimos conformidade
                e agilidade para que seu negócio prospere sem preocupações ambientais.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={300}>
              <div className="mt-9 flex flex-wrap items-center gap-5">
                <FormTriggerButton
                  eventLabel="hero_atendimento"
                  className="inline-flex items-center rounded-full bg-amber-500 px-8 py-4 text-base font-semibold text-white shadow-lg shadow-amber-950/30 transition-all duration-300 hover:bg-amber-600 hover:-translate-y-1 hover:shadow-xl hover:shadow-amber-950/40"
                >
                  Solicitar Atendimento Especializado
                </FormTriggerButton>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={400}>
              <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
                <span className="inline-flex items-center gap-2">
                  <ShieldCheck size={18} className="text-amber-400" />
                  Equipe técnica com ART
                </span>
                <span className="inline-flex items-center gap-2">
                  <Zap size={18} className="text-amber-400" />
                  Conformidade 100% legal
                </span>
              </div>
            </ScrollReveal>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-bounce">
          <ChevronDown className="text-white/60" size={28} />
        </div>
      </ParallaxImage>
    </section>
  );
}

import { Star } from "lucide-react";
import ParallaxImage from "./ParallaxImage";
import ScrollReveal from "./ScrollReveal";

const TESTIMONIALS = [
  {
    name: "João da Silva",
    company: "Transportadora Veloz",
    text: "A Folha foi crucial para a regularização do nosso pátio. Processo rápido e equipe muito competente. Recomendo!",
    rating: 5,
  },
  {
    name: "Maria Oliveira",
    company: "Engenharia Ambiental",
    text: "Conseguimos nossa licença para armazenagem de fertilizantes em tempo recorde. A expertise deles fez toda a diferença.",
    rating: 5,
  },
];

export default function Depoimentos() {
  return (
    <section id="depoimentos" className="relative">
      <ParallaxImage
        src="https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?w=1920&q=80"
        alt="Vista aérea de terminal portuário"
        strength={80}
        className="py-24 md:py-28"
      >
        <div className="absolute inset-0 bg-forest-950/80" />

        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal className="text-center max-w-2xl mx-auto mb-14">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-400">
              Depoimentos
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-white">
              O que nossos clientes dizem
            </h2>
            <p className="mt-4 text-lg text-white/75">
              A confiança que nossos clientes depositam em nós é nosso maior ativo.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {TESTIMONIALS.map((t, i) => (
              <ScrollReveal key={t.name} delay={i * 130}>
                <div className="h-full rounded-2xl border border-white/15 bg-white/10 p-8 backdrop-blur-md transition-transform duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, s) => (
                      <Star
                        key={s}
                        size={18}
                        className="fill-amber-400 text-amber-400"
                      />
                    ))}
                  </div>
                  <p className="italic text-white/90 leading-relaxed">
                    &ldquo;{t.text}&rdquo;
                  </p>
                  <p className="mt-5 font-bold text-white">{t.name}</p>
                  <p className="text-sm text-white/60">{t.company}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </ParallaxImage>
    </section>
  );
}

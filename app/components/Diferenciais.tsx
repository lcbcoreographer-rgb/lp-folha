import { Users, Award, Zap, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const ITEMS = [
  {
    icon: Users,
    title: "Atuação Multissetorial",
    description:
      "Expertise em diversos segmentos, do agronegócio à indústria, garantindo soluções personalizadas.",
  },
  {
    icon: Award,
    title: "Equipe Técnica com ART",
    description:
      "Profissionais qualificados e habilitados, emitindo Anotação de Responsabilidade Técnica para cada projeto.",
  },
  {
    icon: Zap,
    title: "Rapidez e Assertividade",
    description:
      "Processos otimizados para acelerar a obtenção de licenças, sem comprometer a qualidade e a precisão.",
  },
  {
    icon: ShieldCheck,
    title: "Conformidade Legal",
    description:
      "Atuação 100% alinhada às normativas ambientais vigentes, prevenindo multas e sanções.",
  },
];

export default function Diferenciais() {
  return (
    <section id="diferenciais" className="py-24 md:py-28 bg-paper">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
            Por que a Folha
          </span>
          <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-forest-900">
            Nossos Diferenciais
          </h2>
          <p className="mt-4 text-lg text-ink-soft">
            Por que escolher a Folha para seu licenciamento?
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ITEMS.map((item, i) => (
            <ScrollReveal key={item.title} delay={i * 100}>
              <div className="group h-full rounded-2xl bg-white p-8 text-center ring-1 ring-forest-900/[0.06] shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-forest-900/[0.08]">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-xl bg-forest-50 text-amber-600 transition-colors duration-300 group-hover:bg-amber-500 group-hover:text-white">
                  <item.icon size={26} strokeWidth={1.75} />
                </div>
                <h3 className="text-lg font-bold text-forest-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-ink-soft leading-relaxed">
                  {item.description}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

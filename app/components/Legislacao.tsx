import Image from "next/image";
import { ScrollText, Trees, Factory, ShieldCheck } from "lucide-react";
import ScrollReveal from "./ScrollReveal";

const LEGISLACAO = [
  {
    icon: ScrollText,
    text: "Resolução CONAMA nº 237/1997: Estabelece os procedimentos para o licenciamento ambiental.",
  },
  {
    icon: Trees,
    text: "Código Florestal (Lei nº 12.651/2012): Define regras para a proteção da vegetação nativa.",
  },
  {
    icon: Factory,
    text: "Política Nacional de Resíduos Sólidos (Lei nº 12.305/2010): Orienta a gestão integrada de resíduos.",
  },
  {
    icon: ShieldCheck,
    text: "Lei de Crimes Ambientais (Lei nº 9.605/1998): Dispõe sobre as sanções penais e administrativas.",
  },
];

export default function Legislacao() {
  return (
    <section id="legislacao" className="py-24 md:py-28 bg-paper-dim">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-14 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <span className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-600">
              Segurança jurídica
            </span>
            <h2 className="mt-3 text-3xl md:text-4xl font-extrabold text-forest-900">
              Atuação Alinhada às Normas
            </h2>
            <p className="mt-5 text-lg text-ink-soft leading-relaxed">
              A conformidade regulatória é o pilar da sustentabilidade de
              qualquer negócio. Navegar no complexo sistema de leis ambientais
              exige conhecimento aprofundado e constante atualização. Nossa
              equipe garante que seu empreendimento, seja industrial,
              portuário ou de agronegócio, esteja em total acordo com as
              normas vigentes.
            </p>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              Interpretamos e aplicamos as principais legislações federais e
              estaduais, desde o licenciamento até a gestão de resíduos e a
              proteção de áreas de preservação, assegurando tranquilidade
              jurídica e operacional para você.
            </p>

            <ul className="mt-8 space-y-4">
              {LEGISLACAO.map((item, i) => (
                <ScrollReveal
                  key={item.text}
                  as="li"
                  direction="left"
                  delay={200 + i * 120}
                  className="flex items-start gap-3.5"
                >
                  <span className="mt-0.5 flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg bg-forest-100 text-forest-800">
                    <item.icon size={18} strokeWidth={1.75} />
                  </span>
                  <span className="text-ink font-medium leading-snug">
                    {item.text}
                  </span>
                </ScrollReveal>
              ))}
            </ul>
          </ScrollReveal>

          <ScrollReveal direction="scale" delay={150}>
            <div className="relative aspect-[4/5] max-h-[550px] w-full overflow-hidden rounded-2xl shadow-2xl shadow-forest-900/15">
              <Image
                src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200&q=80"
                alt="Equipe analisando documentação legal e ambiental"
                fill
                className="object-cover"
                sizes="(min-width: 768px) 45vw, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-forest-950/30 to-transparent" />
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}

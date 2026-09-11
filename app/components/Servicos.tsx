import ScrollReveal from "./ScrollReveal";

const SERVICOS = [
  "Licenciamento Ambiental",
  "Recuperação de Áreas Degradadas",
  "Acompanhamento de condicionantes",
  "Autorização Ambiental / Florestal",
  "Laudos Ambientais",
];

export default function Servicos() {
  return (
    <section id="servicos" aria-label="Serviços" className="bg-forest-900 py-20 text-white md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        <ul className="border-t border-white/15">
          {SERVICOS.map((servico, i) => (
            <ScrollReveal as="li" key={servico} direction="up" delay={i * 70}>
              {/* sem seta: a linha não leva a lugar nenhum, e seta promete clique */}
              <div className="border-b border-white/15 py-6 md:py-7">
                <span className="font-display text-[clamp(1.35rem,2.6vw,2.1rem)] leading-tight font-light">
                  {servico}
                </span>
              </div>
            </ScrollReveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

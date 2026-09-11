import Counter from "./motion/Counter";
import ScrollReveal from "./ScrollReveal";

/**
 * Números fornecidos pela Folha. Não mexer sem confirmação deles: esta faixa
 * é a afirmação de credibilidade da página, e número errado aqui é passivo.
 */
// O destaque segue o negrito do documento de copy do cliente, palavra por
// palavra: em "+60 clientes atendidos" o negrito cobre a frase inteira.
const INDICADORES = [
  { contagem: { para: 13, sufixo: " anos" }, texto: "de atuação no litoral do Paraná" },
  { contagem: { para: 10, prefixo: "+", sufixo: " segmentos" }, texto: "atendidos, de portos a agronegócio" },
  { contagem: { para: 60, prefixo: "+", sufixo: " clientes atendidos" }, texto: "" },
  { destaque: "Presença local", texto: "no Paraná" },
] as const;

export default function Autoridade() {
  return (
    <section id="autoridade" aria-label="A Folha em números" className="bg-paper-dim py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-12 lg:grid-cols-4">
          {INDICADORES.map((item, i) => (
            <ScrollReveal key={i} direction="up" delay={i * 90}>
              <div className="border-l-2 border-amber-500 pl-5">
                <dt className="font-display text-[clamp(1.9rem,3.4vw,2.75rem)] leading-none font-light text-forest-900">
                  {"contagem" in item ? (
                    <Counter
                      para={item.contagem.para}
                      prefixo={"prefixo" in item.contagem ? item.contagem.prefixo : ""}
                      sufixo={"sufixo" in item.contagem ? item.contagem.sufixo : ""}
                    />
                  ) : (
                    item.destaque
                  )}
                </dt>
                {item.texto && (
                  <dd className="mt-3 text-[0.95rem] leading-snug text-ink-soft">{item.texto}</dd>
                )}
              </div>
            </ScrollReveal>
          ))}
        </dl>
      </div>
    </section>
  );
}

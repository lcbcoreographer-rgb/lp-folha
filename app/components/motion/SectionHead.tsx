import ScrollReveal from "../ScrollReveal";

/**
 * Abertura de seção: rótulo, título e descrição.
 *
 * Não usa mais motion/react. Antes o h2 saía do servidor com `opacity: 0` e só
 * o JS devolvia a opacidade — cinco títulos invisíveis se a hidratação falhasse.
 * O ScrollReveal do projeto faz a mesma revelação por CSS, já respeita
 * prefers-reduced-motion e não depende de hidratação para o texto existir.
 *
 * A prop `destaque` saiu junto: pintar de verde a segunda metade do título em
 * 5 de 5 seções é regra inventada aplicada a 100% das instâncias — lê como
 * template. A hierarquia vem do tamanho, não da cor.
 */
export default function SectionHead({
  rotulo,
  titulo,
  descricao,
  escuro = false,
  centralizado = true,
  className = "",
}: {
  /** só quando a copy traz um eyebrow — não inventar a partir do nome da seção */
  rotulo?: string;
  titulo: string;
  descricao?: string;
  escuro?: boolean;
  centralizado?: boolean;
  className?: string;
}) {
  const corTitulo = escuro ? "text-white" : "text-forest-950";
  // /65 e /45 reprovavam AA em texto de 11px com tracking largo
  const corSuave = escuro ? "text-white/80" : "text-ink-soft";
  const corRotulo = escuro ? "text-white/70" : "text-ink-soft";

  return (
    <div className={`${centralizado ? "mx-auto text-center" : ""} ${className}`}>
      {/* sem rótulo na copy, sem <p> vazio ocupando espaço */}
      {rotulo && (
        <ScrollReveal direction="up">
          <p className={`rotulo ${corRotulo}`}>{rotulo}</p>
        </ScrollReveal>
      )}

      <ScrollReveal direction="up" delay={90}>
        <h2
          className={`text-balance ${rotulo ? "mt-5" : ""} text-[clamp(1.65rem,3vw,2.5rem)] leading-[1.25] font-light ${corTitulo} ${
            centralizado ? "mx-auto max-w-3xl" : "max-w-2xl"
          }`}
        >
          {titulo}
        </h2>
      </ScrollReveal>

      {descricao && (
        <ScrollReveal direction="up" delay={180}>
          <p
            className={`mt-5 text-corpo leading-[1.7] ${corSuave} ${
              centralizado ? "mx-auto max-w-2xl" : "max-w-xl"
            }`}
          >
            {descricao}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}

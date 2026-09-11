import Image from "next/image";
import type { LogoCliente } from "../../lib/clientes";

/**
 * Faixa de logos que desliza sozinha.
 *
 * Fica sobre fundo CLARO, em tons de cinza. A primeira versão pintava os logos
 * de branco sobre o hero escuro com `brightness-0 invert` — mas esse filtro
 * torna branco todo pixel não transparente, e em Delta Fértil, Fertipar, G10 e
 * Miramar o texto é justamente a parte clara dentro de uma forma escura: virava
 * um borrão branco sem letra. Tons de cinza preservam o contraste interno.
 *
 * `mix-blend-multiply` faz o branco puro sumir sobre o creme — é o que
 * esconde o fundo branco do logo da Pasa, o único sem versão transparente.
 *
 * CSS puro para o movimento: a lista vai duplicada e a animação anda metade da
 * largura, onde a segunda cópia começa. Para (sem sumir) com reduced-motion.
 */
export default function LogoMarquee({ logos }: { logos: LogoCliente[] }) {
  if (logos.length === 0) return null;

  return (
    <div
      className="marquee group relative overflow-hidden"
      aria-label="Clientes da Folha"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <ul className="marquee-trilho flex w-max items-center gap-16 group-hover:[animation-play-state:paused]">
        {[...logos, ...logos].map((logo, i) => (
          <li key={`${logo.arquivo}-${i}`} aria-hidden={i >= logos.length} className="shrink-0">
            <Image
              src={logo.arquivo}
              alt={i < logos.length ? logo.nome : ""}
              width={logo.largura}
              height={logo.altura}
              className="opacity-70 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}

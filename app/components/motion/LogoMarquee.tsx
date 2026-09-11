import Image from "next/image";
import type { LogoCliente } from "../../lib/clientes";

/**
 * Faixa de logos que desliza sozinha.
 *
 * CSS puro, sem JS: é uma animação linear infinita, e isso o navegador faz no
 * compositor sem custo. A lista vai duplicada para o laço fechar sem salto — a
 * animação anda exatamente metade da largura, onde a segunda cópia começa.
 *
 * Para, sem sumir, para quem pede menos movimento (regra em globals.css).
 */
export default function LogoMarquee({
  logos,
  escuro = false,
}: {
  logos: LogoCliente[];
  escuro?: boolean;
}) {
  if (logos.length === 0) return null;

  return (
    <div
      className="marquee group relative overflow-hidden"
      aria-label="Clientes da Folha"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <div className="marquee-trilho flex w-max items-center gap-14 group-hover:[animation-play-state:paused]">
        {[...logos, ...logos].map((logo, i) => (
          <Image
            key={`${logo.arquivo}-${i}`}
            src={logo.arquivo}
            alt={i < logos.length ? logo.nome : ""}
            aria-hidden={i >= logos.length}
            width={140}
            height={48}
            className={`h-10 w-auto object-contain opacity-70 transition-opacity hover:opacity-100 ${
              escuro ? "brightness-0 invert" : "grayscale"
            }`}
          />
        ))}
      </div>
    </div>
  );
}

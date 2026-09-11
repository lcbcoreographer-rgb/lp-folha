import Image from "next/image";
import SectionHead from "./motion/SectionHead";
import { LOGOS_CLIENTES } from "../lib/clientes";

/**
 * "Quem confia na Folha" — logos fixos.
 *
 * Não renderiza enquanto a lista em lib/clientes.ts estiver vazia: seção de
 * prova social sem prova é pior que seção nenhuma.
 */
export default function ProvaSocial() {
  if (LOGOS_CLIENTES.length === 0) return null;

  return (
    <section id="clientes" className="bg-paper py-24 md:py-28">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHead rotulo="Prova social" titulo="Quem confia na Folha" />

        <ul className="mx-auto mt-14 grid max-w-5xl grid-cols-2 items-center gap-x-10 gap-y-12 sm:grid-cols-3 lg:grid-cols-4">
          {LOGOS_CLIENTES.map((logo) => (
            <li key={logo.arquivo} className="flex justify-center">
              <Image
                src={logo.arquivo}
                alt={logo.nome}
                width={160}
                height={56}
                className="h-12 w-auto object-contain opacity-75 grayscale transition hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

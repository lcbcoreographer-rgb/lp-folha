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
        <SectionHead titulo="Quem confia na Folha" />

        {/* Flex centralizado em vez de grade: são 17 logos, número primo, e a
            grade de 4 colunas deixava o último sozinho encostado à esquerda.
            Assim a linha que sobra fica centrada. */}
        <ul className="mx-auto mt-14 flex max-w-5xl flex-wrap items-center justify-center gap-y-12">
          {LOGOS_CLIENTES.map((logo) => (
            <li
              key={logo.arquivo}
              className="flex basis-1/2 justify-center sm:basis-1/3 lg:basis-1/4"
            >
              <Image
                src={logo.arquivo}
                alt={logo.nome}
                width={logo.largura}
                height={logo.altura}
                className="opacity-75 mix-blend-multiply grayscale transition duration-300 hover:opacity-100 hover:grayscale-0"
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

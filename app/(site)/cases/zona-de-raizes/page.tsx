import type { Metadata } from "next";
import Image from "next/image";
import { AtSign, Mail, Phone } from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import WhatsAppCTAButton from "../../../components/WhatsAppCTAButton";
import WhatsAppFloat from "../../../components/WhatsAppFloat";
import Counter from "../../../components/motion/Counter";
import Revela from "./Revela";
import FormularioEstudo, { IrParaFormulario, MENSAGEM_WHATSAPP } from "./FormularioEstudo";

/**
 * Página de download do estudo de caso Zona de Raízes. Até setembro/2026 este
 * endereço contava o case inteiro (commit 33d1726); agora ele só se baixa em
 * PDF depois do formulário, que cai direto no CRM. Mesmo endereço para não
 * quebrar os links que já circularam.
 *
 * Texto: copy aprovada do cliente, na ordem dela (blocos 1, 2, 3, 4, formulário
 * e 7). Correções: "compromter" e os travessões, trocados por vírgula.
 *
 * Desenho: no computador o formulário é uma coluna fixa à direita que
 * acompanha a leitura do topo até os números; no celular ele vem depois dos
 * números, na ordem da copy, e todo "Baixar o case completo" leva até ele.
 */

export const metadata: Metadata = {
  title: "Baixe o case: tratamento de efluentes sem parar a operação | Folha Soluções Ambientais",
  description:
    "Baixe o estudo de caso da Folha: tratamento de efluentes de baixo custo para uma indústria no litoral do Paraná, sem energia elétrica, sem parar a operação e sem comprometer o licenciamento no IAT.",
  alternates: { canonical: "/cases/zona-de-raizes" },
  openGraph: {
    title: "Baixe o case técnico: tratamento de efluentes sem parar a operação",
    description:
      "Como a Folha estruturou uma solução de baixo custo para uma indústria no litoral do Paraná. Baixe o case completo em PDF.",
    images: [
      {
        url: "/cases/zona-de-raizes/og-estudo.jpg",
        width: 1200,
        height: 630,
        alt: "Páginas do case Zona de Raízes em dois tablets",
      },
    ],
    type: "article",
  },
};

const IMG = "/cases/zona-de-raizes";

// Um acento por tela: no computador o botão terracota é o do formulário, que
// está sempre à vista; estes viram contorno. No celular o formulário está
// longe, então eles voltam a ser o botão cheio.
const CTA_BASE =
  "inline-flex min-h-13 items-center justify-center rounded-full px-8 py-3.5 text-[0.95rem] font-medium tracking-[0.06em] uppercase transition-colors duration-300 bg-amber-600 text-white hover:bg-amber-700 lg:bg-transparent lg:border";
const CTA_ESCURO = `${CTA_BASE} lg:border-paper/50 lg:text-paper lg:hover:border-paper lg:hover:bg-paper lg:hover:text-forest-950`;
const CTA_CLARO = `${CTA_BASE} lg:border-forest-900/35 lg:text-forest-900 lg:hover:border-forest-900 lg:hover:bg-forest-900 lg:hover:text-paper`;

/** Coluna de leitura: no computador deixa livre a faixa do formulário. */
const LEITURA = "lg:pr-[calc(var(--rail)+3.5rem)]";

const ENCONTRAR: React.ReactNode[] = [
  <>
    Como estruturar um <strong>sistema de tratamento de efluentes de baixo custo</strong>, sem energia
    elétrica, produtos químicos ou geração de lodo
  </>,
  <>
    Como dimensionar o sistema para o <strong>clima do litoral paranaense</strong>, com médias acima de{" "}
    <strong>1.900 mm/ano de chuva</strong>
  </>,
  <>
    Como a zona de raízes viabilizou o <strong>caminho técnico para a solicitação de licenciamento</strong>{" "}
    junto ao IAT, <strong>sem paralisar a operação</strong>
  </>,
  <>
    Que resultados uma solução técnica bem estruturada pode gerar em{" "}
    <strong>custo, prazo e conformidade ambiental</strong>
  </>,
];

const NUMEROS = [
  { para: 13, prefixo: "", unidade: "anos", texto: "de atuação no litoral do Paraná" },
  { para: 10, prefixo: "+", unidade: "segmentos", texto: "atendidos, de porto a agronegócio" },
  { para: 60, prefixo: "+", unidade: "clientes", texto: "atendidos com excelência" },
  { para: null, prefixo: "", unidade: "Presença local", texto: "no litoral paranaense" },
];

export default function EstudoZonaDeRaizes() {
  return (
    <>
      <Header />
      <main>
        {/* palco: topo + blocos 2 a 4, com a coluna do formulário por cima */}
        <div className="relative [--rail:23rem] xl:[--rail:25rem]">
          {/* Bloco 1: topo */}
          {/* flow-root: sem ele a margem negativa dos tablets vaza para a seção e
              o bloco 2 sobe por baixo do topo, em vez dos tablets descerem sobre ele */}
          <section className="relative z-10 flow-root bg-forest-950 pt-28 sm:pt-32 lg:pt-36">
            <div aria-hidden className="absolute inset-0 -z-10 overflow-hidden">
              <Image
                src={`${IMG}/textura-folhagem.webp`}
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover opacity-45"
              />
              <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(30,44,21,0.92)_20%,rgba(30,44,21,0.35))]" />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className={LEITURA}>
                <p className="rotulo estudo-sobe text-paper/75">Case técnico, Folha Soluções Ambientais</p>

                {/* Sem animação: é o LCP (mesma regra do Hero da home). */}
                <h1 className="text-balance mt-6 max-w-[17ch] text-[clamp(2.35rem,5.2vw,4rem)] leading-[1.06] font-light tracking-[-0.02em] text-paper">
                  Tratamento de efluentes sem parar a operação
                </h1>

                <p
                  className="estudo-sobe mt-7 max-w-[58ch] text-corpo leading-[1.7] text-paper/80 [&_strong]:font-medium [&_strong]:text-paper"
                  style={{ "--atraso": "120ms" } as React.CSSProperties}
                >
                  Como a Folha estruturou uma <strong>solução técnica de baixo custo</strong> para o
                  tratamento de efluentes de uma indústria no litoral do Paraná. Com{" "}
                  <strong>investimento inferior ao de uma ETE convencional</strong> e{" "}
                  <strong>sem comprometer o licenciamento ambiental</strong>.
                </p>

                <div className="estudo-sobe mt-9" style={{ "--atraso": "220ms" } as React.CSSProperties}>
                  <IrParaFormulario rotulo="estudo_topo" className={CTA_ESCURO}>
                    Baixar o case completo
                  </IrParaFormulario>
                </div>

                {/* os tablets atravessam para o bloco seguinte, flutuando */}
                <div className="estudo-tablet relative z-10 mx-auto mt-10 -mb-24 max-w-[42rem] sm:-mb-32 lg:mt-2 lg:mr-0 lg:-mb-40">
                  <div>
                    <Image
                      src={`${IMG}/tablets-case.webp`}
                      alt="Duas páginas do case Zona de Raízes abertas em tablets: as etapas em campo e a solução técnica"
                      width={1400}
                      height={1145}
                      priority
                      sizes="(min-width: 1024px) 672px, 92vw"
                      className="h-auto w-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Bloco 2: a tensão */}
          <section className="bg-paper pt-44 pb-20 sm:pt-56 lg:pt-68 lg:pb-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className={LEITURA}>
                <Revela
                  as="h2"
                  efeito="palavras"
                  className="text-balance max-w-[24ch] text-[clamp(1.75rem,3.3vw,2.65rem)] leading-[1.2] font-light tracking-[-0.015em] text-forest-950"
                >
                  E quando o custo de uma estação de tratamento convencional não cabe no cronograma do licenciamento?
                </Revela>

                <Revela atraso={100} className="mt-8 max-w-[62ch] space-y-5 text-corpo leading-[1.75] text-ink-soft">
                  <p>
                    Uma indústria com unidade operacional no litoral do Paraná precisava avançar em
                    regularização ambiental sem comprometer prazos, mas a estação de tratamento de esgoto
                    convencional (ETE) tinha um custo de implantação incompatível com o orçamento e o
                    cronograma do projeto.
                  </p>
                  <p>
                    Sem uma solução técnica validada, a continuidade do licenciamento junto ao IAT ficava
                    em risco. A Folha foi acionada para estruturar um caminho técnico que resolvesse os
                    três desafios do projeto ao mesmo tempo: custo, clima do litoral e conformidade com a
                    Resolução CONAMA nº 430/2011.
                  </p>
                </Revela>

                <Revela atraso={150} className="mt-9">
                  <IrParaFormulario rotulo="estudo_tensao" className={CTA_CLARO}>
                    Baixar o case completo
                  </IrParaFormulario>
                </Revela>

                <Revela efeito="imagem" className="relative mt-14 aspect-[16/9] overflow-hidden rounded-3xl">
                  <Image
                    src={`${IMG}/etapa-01.webp`}
                    alt="Escavadeira abrindo as valas do sistema, já forradas com lona, ao lado da unidade industrial"
                    fill
                    sizes="(min-width: 1280px) 760px, (min-width: 1024px) 540px, 92vw"
                    className="object-cover"
                  />
                </Revela>
              </div>
            </div>
          </section>

          {/* Bloco 3: o que você vai encontrar no case */}
          <section className="bg-paper-dim py-20 lg:py-28">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className={LEITURA}>
                <Revela
                  as="h2"
                  efeito="palavras"
                  className="text-balance text-[clamp(1.75rem,3.3vw,2.65rem)] leading-[1.2] font-light tracking-[-0.015em] text-forest-950"
                >
                  O que você vai encontrar no case
                </Revela>

                <Revela atraso={100} className="mt-10">
                  <Image
                    src={`${IMG}/tablet-metodologia.webp`}
                    alt="Página de metodologia do case, com a seleção das bananeiras e o dimensionamento, aberta num tablet"
                    width={1400}
                    height={926}
                    sizes="(min-width: 1280px) 700px, (min-width: 1024px) 540px, 92vw"
                    className="mx-auto h-auto w-full max-w-[44rem]"
                  />
                </Revela>

                <ol className="mt-10 grid gap-x-10 xl:grid-cols-2">
                  {ENCONTRAR.map((item, i) => (
                    <Revela
                      as="li"
                      key={i}
                      atraso={i * 120}
                      className="grid grid-cols-[2.75rem_minmax(0,1fr)] gap-3 border-t border-rule-forte py-5"
                    >
                      <span className="font-display text-[1.35rem] leading-[1.35] font-light text-forest-700">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p className="text-corpo leading-[1.6] text-ink-soft [&_strong]:font-medium [&_strong]:text-forest-950">
                        {item}
                      </p>
                    </Revela>
                  ))}
                </ol>

                <Revela className="mt-10">
                  <IrParaFormulario rotulo="estudo_encontrar" className={CTA_CLARO}>
                    Baixar o case completo
                  </IrParaFormulario>
                </Revela>
              </div>
            </div>
          </section>

          {/* Bloco 4: a Folha em números */}
          <section aria-label="A Folha em números" className="relative isolate overflow-hidden bg-forest-900 py-20 lg:py-28">
            <Image
              src={`${IMG}/textura-nervuras.webp`}
              alt=""
              fill
              sizes="100vw"
              className="-z-10 object-cover opacity-50"
            />
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className={LEITURA}>
                <Revela
                  as="h2"
                  efeito="palavras"
                  className="text-balance max-w-[22ch] text-[clamp(1.75rem,3.3vw,2.65rem)] leading-[1.2] font-light tracking-[-0.015em] text-paper"
                >
                  Treze anos acompanhando de perto o litoral do Paraná
                </Revela>

                <dl className="mt-12 grid grid-cols-1 gap-x-10 gap-y-10 sm:grid-cols-2">
                  {NUMEROS.map((n, i) => (
                    <Revela key={n.unidade} atraso={i * 100} className="border-l-2 border-forest-600 pl-5">
                      <dt className="font-display leading-none font-light text-paper">
                        {n.para === null ? (
                          <span className="text-[clamp(1.9rem,3.2vw,2.6rem)]">{n.unidade}</span>
                        ) : (
                          <>
                            <span className="text-[clamp(2.8rem,5vw,4rem)] tracking-[-0.02em]">
                              <Counter para={n.para} prefixo={n.prefixo} />
                            </span>
                            <span className="ml-2 text-[clamp(1.2rem,1.8vw,1.5rem)]">{n.unidade}</span>
                          </>
                        )}
                      </dt>
                      <dd className="mt-3 text-[0.98rem] leading-snug text-paper/75">{n.texto}</dd>
                    </Revela>
                  ))}
                </dl>
              </div>
            </div>
          </section>

          {/* Formulário: coluna fixa por cima do palco no computador; no celular, depois dos números */}
          <aside
            aria-label="Baixar o case"
            className="bg-paper-dim py-16 sm:py-20 lg:pointer-events-none lg:absolute lg:inset-0 lg:z-20 lg:bg-transparent lg:py-0"
          >
            <div className="container mx-auto px-4 sm:px-6 lg:flex lg:h-full lg:justify-end lg:px-8">
              <div className="mx-auto max-w-lg lg:mx-0 lg:w-[var(--rail)] lg:max-w-none lg:pt-36 lg:pb-16">
                <div className="lg:pointer-events-auto lg:sticky lg:top-24">
                  <FormularioEstudo />
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Bloco 7: contato direto */}
        <section className="relative isolate overflow-hidden bg-forest-950 py-20 lg:py-28">
          <Image
            src={`${IMG}/textura-nervuras.webp`}
            alt=""
            fill
            sizes="100vw"
            className="-z-10 object-cover opacity-60"
          />
          <div className="container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
            <div>
              <Revela
                as="h2"
                efeito="palavras"
                className="text-balance max-w-[20ch] text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.15] font-light tracking-[-0.015em] text-paper"
              >
                Seu próximo projeto merece crescer com segurança.
              </Revela>

              <Revela atraso={120} className="mt-9">
                <WhatsAppCTAButton
                  eventLabel="estudo_contato"
                  message={MENSAGEM_WHATSAPP}
                  className="inline-flex min-h-13 items-center justify-center rounded-full bg-amber-600 px-8 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700"
                >
                  Fale com o time comercial da Folha
                </WhatsAppCTAButton>

                <ul className="mt-9 space-y-1 text-paper/85">
                  <li>
                    <a
                      href="mailto:comercial@folhasolucoesambientais.com.br"
                      className="inline-flex min-h-11 max-w-full items-center gap-3 underline-offset-4 hover:underline"
                    >
                      <Mail size={18} className="shrink-0 text-forest-600" aria-hidden />
                      <span className="min-w-0 [overflow-wrap:anywhere]">comercial@folhasolucoesambientais.com.br</span>
                    </a>
                  </li>
                  <li>
                    <a href="tel:+5541996199622" className="inline-flex min-h-11 items-center gap-3 underline-offset-4 hover:underline">
                      <Phone size={18} className="shrink-0 text-forest-600" aria-hidden />
                      (41) 99619-9622
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://www.instagram.com/folhasolucoesambientais"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center gap-3 underline-offset-4 hover:underline"
                    >
                      <AtSign size={18} className="shrink-0 text-forest-600" aria-hidden />
                      @folhasolucoesambientais
                    </a>
                  </li>
                </ul>
              </Revela>

              <p className="fio-claro mt-12 max-w-sm pt-5 font-display text-lg font-light text-paper/80">
                Crescimento seguro para operar, expandir e conservar.
              </p>
            </div>

            <Revela atraso={100}>
              <Image
                src={`${IMG}/equipe-simbolo.webp`}
                alt="Equipe da Folha em vistoria de campo, com capacete e colete, numa foto recortada no formato do símbolo da marca"
                width={960}
                height={960}
                sizes="(min-width: 1024px) 440px, 80vw"
                className="mx-auto h-auto w-full max-w-[28rem]"
              />
            </Revela>
          </div>
        </section>
      </main>
      <Footer />
      {/* No celular o botão flutuante cobria o "Baixar o case" do formulário; lá o
          WhatsApp fica no bloco de contato e no painel de sucesso. */}
      <div className="hidden lg:block">
        <WhatsAppFloat />
      </div>
    </>
  );
}

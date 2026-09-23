import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  AtSign,
  Building2,
  CloudSun,
  Coins,
  Eye,
  Globe,
  Mail,
  Phone,
  Puzzle,
  Ruler,
  Ship,
  Sprout,
  Store,
  Warehouse,
} from "lucide-react";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import ScrollReveal from "../../../components/ScrollReveal";
import WhatsAppCTAButton from "../../../components/WhatsAppCTAButton";
import WhatsAppFloat from "../../../components/WhatsAppFloat";
import { LOGOS_CLIENTES, type LogoCliente } from "../../../lib/clientes";

/**
 * Case "Zona de raízes" — versão em página do PDF de 12 slides que a Folha usa
 * na prospecção. O conteúdo segue o PDF slide a slide; só a diagramação muda,
 * porque slide 16:9 não é página rolável.
 *
 * Três erros de digitação do PDF foram corrigidos aqui ("paranaese", "outros
 * matérias inertes", "Porque a Folha"). O resto é o texto original, inclusive
 * "IAP", o nome do órgão na época do projeto.
 */

export const metadata: Metadata = {
  title: "Case: tratamento de efluentes com zona de raízes | Folha Soluções Ambientais",
  description:
    "Como a Folha estruturou uma solução técnica de baixo custo para o tratamento de efluentes de uma indústria de fertilizantes no litoral do Paraná.",
  openGraph: {
    title: "Implantação de tratamento de efluentes com zona de raízes",
    description:
      "Solução biológica, sem energia elétrica nem produtos químicos, para uma indústria de fertilizantes no litoral do Paraná.",
    images: ["/cases/zona-de-raizes/bananeiras.webp"],
    type: "article",
  },
};

const IMG = "/cases/zona-de-raizes";
const MENSAGEM =
  "Olá! Vi o case de tratamento de efluentes com zona de raízes da Folha e quero conversar sobre o meu projeto.";

const BOTAO =
  "inline-flex items-center justify-center rounded-full bg-amber-600 px-8 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700";

// ---------- peças do slide ----------

/** A etiqueta vermelha que abre cada slide do PDF. */
function Etiqueta({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-block bg-amber-600 px-3.5 py-1.5 text-[0.7rem] font-semibold tracking-[0.12em] text-white uppercase">
      {children}
    </span>
  );
}

function Titulo({
  children,
  claro = false,
  className = "",
}: {
  children: React.ReactNode;
  claro?: boolean;
  className?: string;
}) {
  return (
    <h2
      className={`text-balance mt-5 text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.15] font-normal ${
        claro ? "text-paper" : "text-forest-900"
      } ${className}`}
    >
      {children}
    </h2>
  );
}

/**
 * Foto recortada no formato do símbolo da Folha, como nos slides 4 e 11. A
 * máscara é o símbolo da marca recortado no contorno (mascara-simbolo.svg).
 */
function FotoNoSimbolo({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="relative aspect-[1000/902] w-full"
      style={{
        maskImage: "url(/cases/zona-de-raizes/mascara-simbolo.svg)",
        WebkitMaskImage: "url(/cases/zona-de-raizes/mascara-simbolo.svg)",
        maskSize: "contain",
        WebkitMaskSize: "contain",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
        maskPosition: "center",
        WebkitMaskPosition: "center",
      }}
    >
      <Image src={src} alt={alt} fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
    </div>
  );
}

function logo(nome: string): LogoCliente {
  if (nome === "BWSP") return { nome, arquivo: "/clientes/bwsp.png", largura: 156, altura: 30 };
  const l = LOGOS_CLIENTES.find((x) => x.nome === nome);
  if (!l) throw new Error(`logo ausente: ${nome}`);
  return l;
}

// ---------- conteúdo (slides) ----------

const NUMEROS = [
  { valor: "13 anos", texto: "de atuação no litoral do Paraná" },
  { valor: "+10 segmentos", texto: "atendidos, de porto a agronegócio" },
  { valor: "+60 clientes", texto: "atendidos com excelência" },
  { valor: "Presença local", texto: "no litoral paranaense" },
];

const FRENTES = [
  { nome: "Operação Portuária", icone: Ship, logos: ["BR Fértil", "Cargill", "Terin"] },
  { nome: "Imobiliário", icone: Building2, logos: ["JRL", "Luzzi Construtora", "Camboa Hotéis"] },
  { nome: "Transporte / Logística", icone: Warehouse, logos: ["G10 Transportes", "Miramar Transportes", "Rodofrota"] },
  { nome: "Indústria / Comércio", icone: Store, logos: ["Panvel", "BWSP"] },
];

const DESAFIOS = [
  {
    icone: Coins,
    titulo: "Custo x eficácia",
    texto:
      "Entregar um sistema de tratamento eficiente, com investimento muito abaixo do de uma ETE convencional.",
  },
  {
    icone: CloudSun,
    titulo: "Clima do litoral",
    texto:
      "Dimensionar o sistema para chuvas intensas — média histórica acima de 1.900 mm/ano, com picos de mais de 40 mm em uma hora.",
  },
  {
    icone: Puzzle,
    titulo: "Conformidade técnica",
    texto:
      "Atender aos parâmetros da Resolução CONAMA n° 430/2011 para viabilizar a dispensa de licenciamento junto ao IAP.",
  },
];

const INDICADORES_SOLUCAO = [
  { valor: "50 m³/dia", texto: "de efluente tratado, em dois sistemas de 2,50 × 10,00 × 1,00 m" },
  { valor: "0 consumo", texto: "de energia elétrica, produtos químicos ou lodo gerado" },
  { valor: "60 dias", texto: "intervalo de coleta de amostras em laboratório independente no 1º ano" },
];

const ETAPAS = [
  {
    grupo: "Abertura, impermeabilização e leito filtrante",
    itens: [
      { n: "01", texto: ["Abertura de duas valas com 2,50 X 10,00 X 1,00m"], foto: "etapa-01.webp", alt: "Escavadeira abrindo as valas do sistema" },
      {
        n: "02",
        texto: [
          "Forração das valas com lona plástica (dupla face)",
          "Ao fundo serão construídos drenos de entrada e saída feitos de tubo de PVC",
        ],
        foto: "etapa-02.webp",
        alt: "Valas forradas com lona plástica",
      },
      {
        n: "03",
        texto: [
          "Cobertura do tubo de PVC com brita do tipo rachão, cascalhos, restos de construção e outros materiais inertes.",
        ],
        foto: "etapa-03.webp",
        alt: "Vala recebendo camada de brita e cascalho",
      },
    ],
  },
  {
    grupo: "Camada filtrante, plantio e sistema em operação",
    itens: [
      { n: "04", texto: ["Colocação de manta bidin"], foto: "etapa-04.webp", alt: "Manta bidin sobre o leito filtrante" },
      { n: "05", texto: ["Cobertura de terra e plantio de mudas de bananeiras"], foto: "etapa-05.webp", alt: "Equipe plantando mudas de bananeira" },
      { n: "06", texto: ["Saída para as caixas separadoras"], foto: "etapa-06.webp", alt: "Caixa de passagem da saída para as caixas separadoras" },
    ],
  },
];

const METODOLOGIA = [
  {
    icone: Sprout,
    titulo: "Seleção de vegetação",
    texto:
      "Adaptação do Método de Quadrantes (Point-Centered Quarter Method) para dimensionar a densidade de bananeiras por m² no leito filtrante.",
  },
  {
    icone: Ruler,
    titulo: "Dimensionamento técnico",
    texto:
      "Cálculo realizado a partir do período seco — sem depender da vazão de chuva — para tratar o volume real de efluente gerado pela operação.",
  },
  {
    icone: Eye,
    titulo: "Monitoramento contínuo",
    texto:
      "Coleta de amostras a cada 60 dias no primeiro ano, em laboratório independente, avaliando DBO, DQO, fósforo total, nitrogênio, óleos e graxas e sólidos sedimentáveis.",
  },
];

/** Na ordem do slide 10, da esquerda para a direita. */
const RESULTADOS: { destaque: string; resto: string; destaqueNoFim?: boolean }[] = [
  {
    resto: "Caminho técnico estruturado para a dispensa de licenciamento junto ao IAP, ",
    destaque: "sem paralisar a operação.",
    destaqueNoFim: true,
  },
  { destaque: "Investimento muito inferior", resto: " ao de uma ETE convencional" },
  {
    destaque: "Sistema autossustentável.",
    resto: " Sem consumo de energia, produtos químicos, geração de lodo ou odor",
  },
  { destaque: "Efluente tratado", resto: " dentro dos parâmetros da Resolução CONAMA n° 430/2011" },
  { destaque: "Contribuição direta para a conservação", resto: " dos recursos hídricos da região" },
];

const DIFERENCIAIS = [
  {
    titulo: "Experiência local",
    texto: "Vivência técnica no litoral do Paraná: conhecemos o solo, o clima e a rotina de cada operação.",
  },
  {
    titulo: "Soluções sob medida",
    texto: "Cada sistema é dimensionado para a realidade técnica e orçamentária do cliente — sem fórmulas prontas.",
  },
  {
    titulo: "Intermediação qualificada",
    texto: "Atuamos como ponte entre a empresa e o órgão ambiental, tratando-o como parceiro no processo.",
  },
  {
    titulo: "Acompanhamento contínuo",
    texto: "Monitoramento, laudos e suporte técnico do início da obra até a operação do sistema.",
  },
];

// ---------- página ----------

export default function CaseZonaDeRaizes() {
  return (
    <>
      <Header />
      <main>
        {/* Slide 1 — capa */}
        <section className="relative overflow-hidden bg-forest-950 pt-32 pb-20 md:pt-40 md:pb-28">
          <Image src={`${IMG}/textura-folhagem.webp`} alt="" fill priority className="object-cover opacity-70" />
          <div className="relative z-10 container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
            <div>
              <Etiqueta>Case de sucesso — Folha Soluções Ambientais</Etiqueta>
              <h1 className="text-balance mt-7 text-[clamp(2.2rem,4.8vw,3.75rem)] leading-[1.1] font-light text-paper">
                Implantação de tratamento de efluentes com zona de raízes
              </h1>
              <p className="mt-6 max-w-xl text-corpo leading-[1.7] text-paper/85">
                Como a Folha estruturou uma solução técnica de baixo custo para o tratamento de
                efluentes de uma indústria de fertilizantes no litoral do Paraná
              </p>
              <div className="mt-9">
                <WhatsAppCTAButton eventLabel="case_zona_raizes_topo" message={MENSAGEM} className={BOTAO}>
                  Falar com especialista
                </WhatsAppCTAButton>
              </div>
              <div className="mt-14 max-w-xs border-t border-paper/40 pt-4">
                <p className="text-sm text-paper/80 italic">
                  Crescimento seguro para operar, expandir e conservar.
                </p>
              </div>
            </div>
            <ScrollReveal direction="up" delay={150}>
              <FotoNoSimbolo src={`${IMG}/bananeiras.webp`} alt="Bananeiras crescidas sobre o leito filtrante do sistema" />
            </ScrollReveal>
          </div>
        </section>

        {/* Slide 2 — a Folha em números */}
        <section className="bg-forest-900 py-20 md:py-24">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Etiqueta>A Folha em números</Etiqueta>
            <Titulo claro className="max-w-2xl">
              Treze anos acompanhando de perto o litoral do Paraná
            </Titulo>
            <dl className="mt-14 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
              {NUMEROS.map((n, i) => (
                <ScrollReveal key={n.valor} direction="up" delay={i * 90}>
                  <dt className="font-display text-[clamp(1.9rem,3.2vw,2.6rem)] leading-none font-medium text-paper">
                    {n.valor}
                  </dt>
                  <dd className="mt-3 text-[0.95rem] text-paper/75">{n.texto}</dd>
                </ScrollReveal>
              ))}
            </dl>
          </div>
        </section>

        {/* Slide 3 — atuação */}
        <section className="bg-paper py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Etiqueta>Atuação</Etiqueta>
            <Titulo className="max-w-2xl">Presença em diferentes frentes da economia paranaense</Titulo>
            <div className="mt-14 grid gap-6 md:grid-cols-2">
              {FRENTES.map((f, i) => (
                <ScrollReveal key={f.nome} direction="up" delay={i * 80}>
                  <div className="rounded-2xl border border-rule bg-paper-dim/50 p-6">
                    <div className="flex items-center gap-3">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-600 text-white">
                        <f.icone size={20} strokeWidth={1.6} />
                      </span>
                      <h3 className="text-lg font-medium text-forest-900">{f.nome}</h3>
                    </div>
                    <ul className="mt-6 flex flex-wrap items-center gap-x-8 gap-y-5">
                      {f.logos.map((nome) => {
                        const l = logo(nome);
                        return (
                          <li key={nome}>
                            <Image
                              src={l.arquivo}
                              alt={l.nome}
                              width={l.largura}
                              height={l.altura}
                              className="mix-blend-multiply"
                            />
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                </ScrollReveal>
              ))}
            </div>
            <p className="mt-8 text-right text-ink-soft">+60 clientes em diversos segmentos</p>
          </div>
        </section>

        {/* Slide 4 — o ponto de partida */}
        <section className="bg-paper-dim py-20 md:py-28">
          <div className="container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Etiqueta>O ponto de partida</Etiqueta>
              <Titulo>Uma operação industrial que não podia parar</Titulo>
              <div className="mt-8 rounded-2xl border border-forest-900/40 bg-paper p-6">
                <p className="text-sm font-semibold tracking-[0.08em] text-forest-900 uppercase">O cliente</p>
                <p className="mt-2 text-corpo leading-[1.65] text-ink">
                  Uma indústria de fertilizantes com unidade operacional no litoral do Paraná. Um
                  negócio que já lidava com a rotina da operação industrial e portuária e precisava
                  avançar em regularização ambiental sem comprometer prazos.
                </p>
              </div>
              <dl className="mt-8 space-y-6">
                <div>
                  <dt className="text-sm font-semibold tracking-[0.08em] text-amber-600 uppercase">Problema 01</dt>
                  <dd className="mt-1.5 leading-[1.65] text-ink">
                    Uma estação de tratamento de esgoto convencional (ETE) tinha custo de implantação
                    incompatível com o cronograma e o orçamento do projeto.
                  </dd>
                </div>
                <div>
                  <dt className="text-sm font-semibold tracking-[0.08em] text-amber-600 uppercase">Problema 02</dt>
                  <dd className="mt-1.5 leading-[1.65] text-ink">
                    Sem uma solução técnica validada, a continuidade do licenciamento ambiental junto
                    ao IAP ficava em risco.
                  </dd>
                </div>
              </dl>
            </div>
            <ScrollReveal direction="up">
              <FotoNoSimbolo src={`${IMG}/ponto-de-partida.webp`} alt="Mudas de bananeira no início do sistema, junto ao muro da unidade" />
            </ScrollReveal>
          </div>
        </section>

        {/* Slide 5 — o desafio */}
        <section className="bg-paper py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Etiqueta>O desafio</Etiqueta>
            <Titulo className="max-w-xl">Os 3 desafios centrais do projeto</Titulo>
            <div className="mt-14 grid gap-6 md:grid-cols-3">
              {DESAFIOS.map((d, i) => (
                <ScrollReveal key={d.titulo} direction="up" delay={i * 90}>
                  <article className="h-full rounded-2xl bg-forest-900 p-7 shadow-lg">
                    <span className="flex h-14 w-14 items-center justify-center rounded-full bg-amber-600 text-white">
                      <d.icone size={24} strokeWidth={1.6} />
                    </span>
                    <h3 className="mt-6 text-xl font-medium text-paper">{d.titulo}</h3>
                    <p className="mt-3 leading-[1.65] text-paper/85">{d.texto}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        {/* Slide 6 — a solução */}
        <section className="bg-paper-dim py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
              <div>
                <Etiqueta>A solução Folha</Etiqueta>
                <Titulo>Zona de raízes: tratamento biológico movido pela natureza</Titulo>
              </div>
              <p className="text-corpo leading-[1.7] text-ink lg:pt-14">
                O efluente passa por caixas de sedimentação e filtros de retenção de sólidos e gordura,
                e em seguida é conduzido para dois módulos de zona de raízes, plantados com bananeiras
                (Musa spp.), que funcionam como um filtro biológico vivo. Não há necessidade de energia
                elétrica, produtos químicos ou equipamentos mecânicos.
              </p>
            </div>

            <div className="mt-14 grid items-center gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
              <figure className="rounded-2xl bg-white p-5 shadow-sm">
                <Image
                  src={`${IMG}/projeto-tecnico.webp`}
                  alt="Projeto técnico dos módulos de zona de raízes, em corte e em planta"
                  width={1600}
                  height={1083}
                  className="w-full"
                />
                <figcaption className="mt-4 leading-[1.6] text-ink-soft">
                  <span className="mb-1 block text-sm font-semibold text-forest-900">
                    Corte e planta do sistema de zona de raízes — projeto técnico Folha
                  </span>
                  Vegetação selecionada por meio de adaptação do Método de Quadrantes (Point-Centered
                  Quarter Method), garantindo densidade adequada de bananeiras por m².
                </figcaption>
              </figure>
              <dl className="space-y-4">
                {INDICADORES_SOLUCAO.map((ind, i) => (
                  <ScrollReveal
                    key={ind.valor}
                    direction="up"
                    delay={i * 90}
                    className="grid grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] items-center gap-5 rounded-xl bg-forest-900 px-6 py-5"
                  >
                    <dt className="font-display text-[1.6rem] leading-tight font-medium text-paper">{ind.valor}</dt>
                    <dd className="text-[0.95rem] leading-snug text-paper/85">{ind.texto}</dd>
                  </ScrollReveal>
                ))}
              </dl>
            </div>
          </div>
        </section>

        {/* Slides 7 e 8 — em campo */}
        <section className="bg-paper py-20 md:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {ETAPAS.map((g, gi) => (
              <div key={g.grupo} className={gi > 0 ? "mt-20" : ""}>
                <Etiqueta>Em campo</Etiqueta>
                <p className="mt-5 text-lg font-medium text-forest-900">
                  Etapas da implantação:
                </p>
                <h2 className="text-balance mt-1 text-[clamp(1.6rem,3vw,2.4rem)] leading-[1.2] font-normal text-forest-900">
                  {g.grupo}
                </h2>
                <ol className="mt-10 grid gap-6 md:grid-cols-3">
                  {g.itens.map((e, i) => (
                    <ScrollReveal as="li" key={e.n} direction="up" delay={i * 90}>
                      <article className="flex h-full flex-col rounded-3xl bg-forest-900 p-6 shadow-lg">
                        <h3 className="text-lg font-semibold text-paper">ETAPA {e.n}</h3>
                        <div className="mt-2 space-y-3">
                          {e.texto.map((t) => (
                            <p key={t} className="leading-[1.5] text-paper/85">
                              {t}
                            </p>
                          ))}
                        </div>
                        <div className="relative mt-6 aspect-[4/3] w-full overflow-hidden rounded-3xl">
                          <Image
                            src={`${IMG}/${e.foto}`}
                            alt={e.alt}
                            fill
                            sizes="(max-width: 768px) 100vw, 33vw"
                            className="object-cover"
                          />
                        </div>
                      </article>
                    </ScrollReveal>
                  ))}
                </ol>
              </div>
            ))}
          </div>
        </section>

        {/* Slide 9 — metodologia */}
        <section className="relative overflow-hidden bg-forest-900 py-20 md:py-28">
          <Image src={`${IMG}/textura-nervuras.webp`} alt="" fill className="object-cover opacity-60" />
          <div className="relative z-10 container mx-auto grid gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Etiqueta>Metodologia</Etiqueta>
              <Titulo claro>Ciência aplicada ao dia a dia da operação</Titulo>
              <ul className="mt-10 space-y-8">
                {METODOLOGIA.map((m) => (
                  <li key={m.titulo} className="grid grid-cols-[auto_minmax(0,1fr)] gap-5">
                    <m.icone size={36} strokeWidth={1.4} className="text-amber-400" />
                    <div>
                      <h3 className="text-xl font-medium text-paper">{m.titulo}</h3>
                      <p className="mt-1.5 leading-[1.65] text-paper/80">{m.texto}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="grid content-center gap-6">
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                <Image src={`${IMG}/bananeiras.webp`} alt="Leito de zona de raízes com bananeiras adultas" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
              <div className="relative aspect-[16/9] overflow-hidden rounded-3xl">
                <Image src={`${IMG}/leito-filtrante.webp`} alt="Vala impermeabilizada com o dreno de PVC" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover" />
              </div>
            </div>
          </div>
        </section>

        {/* Slide 10 — o resultado */}
        <section className="relative overflow-hidden bg-forest-950 py-20 md:py-28">
          <Image src={`${IMG}/textura-nervuras.webp`} alt="" fill className="object-cover opacity-50" />
          <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-2">
              <div>
                <Etiqueta>O resultado</Etiqueta>
                <Titulo claro>Uma solução que acompanha o crescimento da operação</Titulo>
              </div>
              <div className="relative aspect-[16/7] overflow-hidden rounded-3xl">
                <Image src={`${IMG}/resultado.webp`} alt="Equipe finalizando a camada de brita do sistema" fill sizes="(max-width: 1024px) 100vw, 50vw" className="object-cover object-[50%_35%]" />
              </div>
            </div>

            {/* linha do tempo: horizontal no desktop, vertical no celular */}
            <ol className="relative mt-16 grid gap-8 border-l border-amber-500 pl-8 xl:grid-cols-5 xl:gap-6 xl:border-l-0 xl:pl-0 xl:before:absolute xl:before:inset-x-0 xl:before:top-1/2 xl:before:h-px xl:before:bg-amber-500">
              {RESULTADOS.map((r, i) => (
                <li
                  key={r.destaque}
                  className={`relative xl:flex xl:min-h-[17rem] xl:flex-col xl:items-center xl:text-center ${
                    i % 2 === 0 ? "xl:justify-end" : "xl:justify-start"
                  }`}
                >
                  <span
                    aria-hidden
                    className="absolute top-1.5 -left-[2.45rem] h-4 w-4 rounded-full bg-paper xl:top-1/2 xl:left-1/2 xl:h-6 xl:w-6 xl:-translate-x-1/2 xl:-translate-y-1/2"
                  />
                  <p className={`leading-[1.5] text-paper/85 xl:max-w-[14rem] ${i % 2 === 0 ? "xl:pt-12" : "xl:pb-12"}`}>
                    {r.destaqueNoFim ? (
                      <>
                        {r.resto}
                        <strong className="font-semibold text-paper">{r.destaque}</strong>
                      </>
                    ) : (
                      <>
                        <strong className="font-semibold text-paper">{r.destaque}</strong>
                        {r.resto}
                      </>
                    )}
                  </p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Slide 11 — por que a Folha */}
        <section className="bg-paper py-20 md:py-28">
          <div className="container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-2 lg:px-8">
            <div>
              <Etiqueta>Por que a Folha</Etiqueta>
              <Titulo>Somos parceiros técnicos de cada etapa da operação</Titulo>
              <dl className="mt-10 space-y-7">
                {DIFERENCIAIS.map((d) => (
                  <div key={d.titulo}>
                    <dt className="text-xl font-medium text-amber-600">{d.titulo}</dt>
                    <dd className="mt-1.5 max-w-md leading-[1.6] text-ink-soft">{d.texto}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <ScrollReveal direction="up">
              <FotoNoSimbolo src={`${IMG}/equipe-em-campo.webp`} alt="Equipe da Folha em vistoria de campo, com capacete e colete" />
            </ScrollReveal>
          </div>
        </section>

        {/* Slide 12 — contato */}
        <section className="relative overflow-hidden bg-forest-950 py-20 md:py-28">
          <Image src={`${IMG}/textura-nervuras.webp`} alt="" fill className="object-cover opacity-60" />
          <div className="relative z-10 container mx-auto grid items-center gap-14 px-4 sm:px-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:px-8">
            <div>
              <h2 className="text-balance text-[clamp(1.9rem,3.8vw,3rem)] leading-[1.15] font-normal text-paper">
                Seu próximo projeto merece crescer com segurança.
              </h2>
              <div className="mt-9">
                <WhatsAppCTAButton eventLabel="case_zona_raizes_final" message={MENSAGEM} className={BOTAO}>
                  Fale com o time comercial da Folha
                </WhatsAppCTAButton>
              </div>
              <ul className="mt-9 space-y-3 text-paper/85">
                <li>
                  <a
                    href="mailto:consultoria@folhasolucoesambientais.com.br"
                    className="inline-flex max-w-full items-center gap-2.5 underline-offset-4 hover:underline"
                  >
                    <Mail size={17} className="shrink-0" />
                    <span className="min-w-0 [overflow-wrap:anywhere]">consultoria@folhasolucoesambientais.com.br</span>
                  </a>
                </li>
                <li>
                  <a href="tel:+5541984236033" className="inline-flex items-center gap-2.5 underline-offset-4 hover:underline">
                    <Phone size={17} /> (41) 98423-6033
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/folhasolucoesambientais"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 underline-offset-4 hover:underline"
                  >
                    <AtSign size={17} /> @folhasolucoesambientais
                  </a>
                </li>
                <li>
                  <Link href="/" className="inline-flex items-center gap-2.5 underline-offset-4 hover:underline">
                    <Globe size={17} /> www.folhasolucoesambientais.com
                  </Link>
                </li>
              </ul>
              <p className="mt-12 text-sm text-paper/70 italic">
                Crescimento seguro para operar, expandir e conservar.
              </p>
            </div>
            <figure className="mx-auto w-full max-w-sm text-center">
              <div className="relative aspect-square overflow-hidden rounded-full border border-paper/20">
                <Image src={`${IMG}/denise.webp`} alt="Denise Folha, diretora comercial da Folha" fill sizes="384px" className="object-cover" />
              </div>
              <figcaption className="mt-5">
                <p className="text-xl font-medium text-paper">Denise Folha</p>
                <p className="text-paper/75">Diretora Comercial</p>
              </figcaption>
            </figure>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  );
}

/**
 * De onde veio a visita, para o CRM saber se o lead do WhatsApp veio do anúncio.
 *
 * Todo botão de WhatsApp acrescenta "(cód. X-1234)" numa linha própria no fim
 * da mensagem pronta. X é o canal; os 4 dígitos são aleatórios, só para parecer
 * protocolo. O CRM lê o código (crm: app/lib/origemLead.ts) e grava a origem.
 *   A Google Ads · B busca no Google · M Instagram/Facebook · E e-mail
 *   O outro site ou outra campanha · S direto, sem nada
 *
 * Só TypeScript apagável (nada de enum): `node scripts/origem-check.mjs` importa
 * este arquivo direto.
 */

export type Canal = "A" | "B" | "M" | "E" | "O" | "S";

/**
 * Parâmetros da visita, para o CRM mostrar de onde veio (ex.: post orgânico do
 * LinkedIn). Só chaves com valor; texto simples de até 100 caracteres.
 * gclid/fbclid só entram se vieram na URL; referencia é só o domínio de fora.
 */
export interface Visita {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
  gclid?: string;
  fbclid?: string;
  /** caminho da página de chegada, sem query */
  chegada?: string;
  /** domínio do site de onde a pessoa veio, sem www */
  referencia?: string;
}

export interface OrigemGuardada {
  canal: Canal;
  em: number;
  utm?: Visita;
}

const CHAVES_VISITA = ["source", "medium", "campaign", "content", "term", "gclid", "fbclid", "chegada", "referencia"] as const;

const NOVENTA_DIAS = 90 * 24 * 60 * 60 * 1000;
const CANAIS = ["A", "B", "M", "E", "O", "S"];
/** utm_source ou utm_medium que é da Meta. */
const DA_META = /instagram|facebook|^(ig|fb|meta)$/;

function hostDe(url: string): string {
  try {
    // android-app://com.google.android.googlequicksearchbox/ também tem hostname
    return new URL(url).hostname.toLowerCase().replace(/^www\./, "");
  } catch {
    return "";
  }
}

/** Canal da visita atual, pela URL de chegada e pelo referrer. */
export function classificarCanal(search: string, referrer: string, hostDoSite: string): Canal {
  const p = new URLSearchParams(search);
  const v = (k: string) => (p.get(k) ?? "").trim().toLowerCase();
  const fonte = v("utm_source");
  const meio = v("utm_medium");
  const ref = hostDe(referrer);
  const externo = ref !== "" && ref !== hostDoSite.toLowerCase().replace(/^www\./, "");

  if (v("gclid") || v("gbraid") || v("wbraid")) return "A";
  if (/^(cpc|ppc|paid)$/.test(meio) && (fonte === "" || fonte.includes("google"))) return "A";
  if (
    v("fbclid") ||
    [fonte, meio].some((x) => DA_META.test(x)) ||
    /(^|\.)(instagram|facebook)\.com$/.test(ref) ||
    /^com\.(instagram|facebook)\./.test(ref) // app do Android
  ) {
    return "M";
  }
  if (/^e-?mail$/.test(meio)) return "E";
  if (ref === "com.google.android.googlequicksearchbox" || /^google(\.[a-z]{2,3}){1,2}$/.test(ref)) return "B";
  if (externo || fonte || meio || v("utm_campaign")) return "O";
  return "S";
}

/** Texto simples: sem caracteres de controle, espaços aparados, no máximo 100. */
function limpar(v: unknown): string {
  return typeof v === "string" ? v.replace(/[\u0000-\u001f\u007f]/g, "").trim().slice(0, 100) : "";
}

/** Só as chaves conhecidas, só com valor. Serve para o que vem da URL e para o que volta do localStorage. */
export function limparVisita(o: unknown): Visita {
  const saida: Visita = {};
  if (!o || typeof o !== "object") return saida;
  for (const k of CHAVES_VISITA) {
    const v = limpar((o as Record<string, unknown>)[k]);
    if (v) saida[k] = v;
  }
  return saida;
}

/** Parâmetros da visita atual: UTM, gclid/fbclid, página de chegada e referrer de fora. */
export function lerVisita(search: string, referrer: string, hostDoSite: string, pathname: string): Visita {
  const p = new URLSearchParams(search);
  const ref = hostDe(referrer);
  const externo = ref !== "" && ref !== hostDoSite.toLowerCase().replace(/^www\./, "");
  return limparVisita({
    source: p.get("utm_source"),
    medium: p.get("utm_medium"),
    campaign: p.get("utm_campaign"),
    content: p.get("utm_content"),
    term: p.get("utm_term"),
    gclid: p.get("gclid"),
    fbclid: p.get("fbclid"),
    chegada: pathname.startsWith("/") ? pathname.split(/[?#]/)[0] : "",
    referencia: externo ? ref : "",
  });
}

/** Visita marcada: veio de algum lugar identificável (canal diferente de direto, ou UTM/clique de anúncio). */
function marcada(o: { canal: Canal; utm?: Visita }): boolean {
  const u = o.utm ?? {};
  return o.canal !== "S" || Boolean(u.source || u.medium || u.campaign || u.content || u.term || u.gclid || u.fbclid || u.referencia);
}

/** Lê o que ficou guardado. Vencido (90 dias), estragado ou de outro formato = nada. */
export function lerGuardada(json: string | null, agora: number): OrigemGuardada | null {
  try {
    const o = JSON.parse(json ?? "null");
    if (!o || !CANAIS.includes(o.canal) || typeof o.em !== "number") return null;
    if (Math.abs(agora - o.em) >= NOVENTA_DIAS) return null;
    const utm = limparVisita(o.utm);
    return Object.keys(utm).length ? { canal: o.canal, em: o.em, utm } : { canal: o.canal, em: o.em };
  } catch {
    return null;
  }
}

/**
 * Anúncio da Meta: canal M com fbclid na URL, ou com utm_medium pago e
 * utm_source da Meta. Post orgânico com UTM, sem fbclid, não conta.
 */
function anuncioDaMeta(canal: Canal, utm: Visita = {}): boolean {
  if (canal !== "M") return false;
  if (utm.fbclid) return true;
  return /^(cpc|ppc|paid|paid_social|ads)$/.test((utm.medium ?? "").toLowerCase()) && DA_META.test((utm.source ?? "").toLowerCase());
}

/**
 * Anúncio sempre vence (Google Ads ou Meta); fora isso, fica a primeira visita
 * marcada. Visita sem nada (direto) nunca apaga uma marcada, mas uma marcada
 * toma o lugar de uma guardada sem nada. O canal e os parâmetros andam juntos.
 */
export function escolherOrigem(guardada: OrigemGuardada | null, atual: Canal, agora: number, utm?: Visita): OrigemGuardada {
  const nova: OrigemGuardada = utm && Object.keys(utm).length ? { canal: atual, em: agora, utm } : { canal: atual, em: agora };
  if (atual === "A" || anuncioDaMeta(atual, utm) || !guardada) return nova;
  if (!marcada(guardada) && marcada(nova)) return nova;
  return guardada;
}

/** n: qualquer número; vira 4 dígitos. */
export function codigoOrigem(canal: Canal, n: number): string {
  return `(cód. ${canal}-${String(Math.floor(Math.abs(n)) % 10000).padStart(4, "0")})`;
}

export function mensagemComCodigo(mensagem: string, codigo: string | null): string {
  return codigo ? `${mensagem.trimEnd()}\n${codigo}` : mensagem;
}

const CHAVE = "folha_origem";
let daOrigem: OrigemGuardada | null = null;
let daVisita: string | null = null;

/**
 * Origem desta visita (canal + parâmetros). Só no navegador: a primeira chamada
 * (o primeiro botão montado, e o Header está em toda página) lê a URL de
 * chegada. Navegar dentro do site não muda nada.
 */
export function origemDaVisita(): OrigemGuardada {
  if (daOrigem) return daOrigem;
  const agora = Date.now();
  const canal = classificarCanal(location.search, document.referrer, location.hostname);
  const utm = lerVisita(location.search, document.referrer, location.hostname, location.pathname);
  let origem = escolherOrigem(null, canal, agora, utm);
  try {
    origem = escolherOrigem(lerGuardada(localStorage.getItem(CHAVE), agora), canal, agora, utm);
    localStorage.setItem(CHAVE, JSON.stringify(origem));
  } catch {
    // armazenamento bloqueado (aba anônima, navegador restrito): vale só esta visita
  }
  daOrigem = origem;
  return origem;
}

/** Código desta visita, igual para todos os botões. */
export function codigoDaVisita(): string {
  if (daVisita) return daVisita;
  daVisita = codigoOrigem(origemDaVisita().canal, Math.random() * 10000);
  return daVisita;
}

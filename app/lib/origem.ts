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

export interface OrigemGuardada {
  canal: Canal;
  em: number;
}

const NOVENTA_DIAS = 90 * 24 * 60 * 60 * 1000;
const CANAIS = ["A", "B", "M", "E", "O", "S"];

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
    [fonte, meio].some((x) => /instagram|facebook|^(ig|fb)$/.test(x)) ||
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

/** Lê o que ficou guardado. Vencido (90 dias), estragado ou de outro formato = nada. */
export function lerGuardada(json: string | null, agora: number): OrigemGuardada | null {
  try {
    const o = JSON.parse(json ?? "null");
    if (!o || !CANAIS.includes(o.canal) || typeof o.em !== "number") return null;
    return Math.abs(agora - o.em) < NOVENTA_DIAS ? { canal: o.canal, em: o.em } : null;
  } catch {
    return null;
  }
}

/** Anúncio sempre vence (como no Google Ads); fora isso, fica a primeira origem. */
export function escolherOrigem(guardada: OrigemGuardada | null, atual: Canal, agora: number): OrigemGuardada {
  if (atual === "A" || !guardada) return { canal: atual, em: agora };
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
let daVisita: string | null = null;

/**
 * Código desta visita, igual para todos os botões. Só no navegador: a primeira
 * chamada (o primeiro botão montado, e o Header está em toda página) lê a URL
 * de chegada. Navegar dentro do site não muda o código.
 */
export function codigoDaVisita(): string {
  if (daVisita) return daVisita;
  const agora = Date.now();
  let origem: OrigemGuardada = {
    canal: classificarCanal(location.search, document.referrer, location.hostname),
    em: agora,
  };
  try {
    origem = escolherOrigem(lerGuardada(localStorage.getItem(CHAVE), agora), origem.canal, agora);
    localStorage.setItem(CHAVE, JSON.stringify(origem));
  } catch {
    // armazenamento bloqueado (aba anônima, navegador restrito): vale só esta visita
  }
  daVisita = codigoOrigem(origem.canal, Math.random() * 10000);
  return daVisita;
}

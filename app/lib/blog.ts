/**
 * Conteúdo do blog, escrito no CRM da Folha.
 *
 * A LP não fala com o banco: lê a rota pública do CRM, que já filtra rascunho.
 * Assim a chave do Supabase não precisa existir neste servidor.
 *
 * `revalidate: 60` é o "tempo real" possível sem deploy — um post publicado
 * aparece aqui em até um minuto, e o site não bate no CRM a cada visita.
 */
import { linkSeguro } from "./textoRico";

const CRM_URL = process.env.CRM_URL || "https://crm-folha-v2.vercel.app";

/** O formato antigo, que posts escritos antes do editor por blocos ainda usam. */
export type BlocoAntigo =
  | { tipo: "titulo"; texto: string }
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "imagem"; url: string; legenda?: string };

/** Blocos do editor do CRM (crm-folha, app/lib/postTypes.ts). */
export type BlocoPost =
  | { tipo: "titulo"; texto: string; nivel: 2 | 3 }
  | { tipo: "texto"; html: string }
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "imagem"; url: string; alt: string; legenda: string; largura: "total" | "media" }
  | { tipo: "citacao"; texto: string; autor: string }
  | { tipo: "destaque"; texto: string; tom: "atencao" | "dica" }
  | { tipo: "botao"; texto: string; acao: "whatsapp" | "link"; url: string; mensagem: string }
  | { tipo: "video"; embed: string }
  | { tipo: "divisor" };

export interface PostPublico {
  slug: string;
  titulo: string;
  resumo: string | null;
  capa_url: string | null;
  /** Só título, parágrafo e imagem: o que o site antigo entendia. */
  conteudo: BlocoAntigo[];
  /** A lista completa do editor por blocos; o CRM manda os dois. */
  blocos?: unknown[];
  publicado_em: string | null;
  autor: string | null;
}

const ID_YOUTUBE = /^[\w-]{11}$/;
const HASH_VIMEO = /^[0-9a-f]{6,20}$/i;

/**
 * Link do YouTube ou do Vimeo vira o endereço do player (YouTube sem cookie).
 * Outro site volta null e o bloco não aparece: o iframe só abre esses dois.
 */
export function embedDoVideo(entrada: string): string | null {
  let u: URL;
  try {
    u = new URL(String(entrada ?? "").trim());
  } catch {
    return null;
  }
  if (u.protocol !== "https:" && u.protocol !== "http:") return null;
  const host = u.hostname.toLowerCase().replace(/^(www\.|m\.)/, "");
  const partes = u.pathname.split("/").filter(Boolean);

  if (host === "youtu.be" || host === "youtube.com" || host === "youtube-nocookie.com") {
    const id =
      host === "youtu.be"
        ? partes[0]
        : partes[0] === "watch"
          ? u.searchParams.get("v")
          : ["embed", "shorts", "live"].includes(partes[0])
            ? partes[1]
            : null;
    return id && ID_YOUTUBE.test(id) ? `https://www.youtube-nocookie.com/embed/${id}` : null;
  }
  if (host === "vimeo.com" || host === "player.vimeo.com") {
    const i = partes.findIndex((p) => /^\d{6,12}$/.test(p));
    if (i === -1) return null;
    const hash = partes[i + 1] ?? u.searchParams.get("h") ?? "";
    return `https://player.vimeo.com/video/${partes[i]}${HASH_VIMEO.test(hash) ? `?h=${hash}` : ""}`;
  }
  return null;
}

function texto(valor: unknown): string {
  return typeof valor === "string" ? valor.trim() : "";
}

/**
 * Os blocos que a página mostra: a lista nova quando o CRM manda, senão o
 * formato antigo. O CRM já valida tudo, mas o site confere de novo o que abre
 * para o visitante: tipo desconhecido some, link que não é http ou https some,
 * texto rico passa pelo sanitizador na hora de renderizar.
 */
export function lerBlocos(post: PostPublico): BlocoPost[] {
  const brutos: unknown[] = Array.isArray(post.blocos) ? post.blocos : Array.isArray(post.conteudo) ? post.conteudo : [];
  const blocos: BlocoPost[] = [];
  for (const item of brutos) {
    if (!item || typeof item !== "object") continue;
    const b = item as Record<string, unknown>;
    switch (b.tipo) {
      case "titulo":
        if (texto(b.texto)) blocos.push({ tipo: "titulo", texto: texto(b.texto), nivel: b.nivel === 3 ? 3 : 2 });
        break;
      case "texto":
        if (texto(b.html)) blocos.push({ tipo: "texto", html: texto(b.html) });
        break;
      case "paragrafo":
        if (texto(b.texto)) blocos.push({ tipo: "paragrafo", texto: texto(b.texto) });
        break;
      case "imagem": {
        const url = linkSeguro(texto(b.url), false);
        if (url) {
          blocos.push({ tipo: "imagem", url, alt: texto(b.alt), legenda: texto(b.legenda), largura: b.largura === "media" ? "media" : "total" });
        }
        break;
      }
      case "citacao":
        if (texto(b.texto)) blocos.push({ tipo: "citacao", texto: texto(b.texto), autor: texto(b.autor) });
        break;
      case "destaque":
        if (texto(b.texto)) blocos.push({ tipo: "destaque", texto: texto(b.texto), tom: b.tom === "dica" ? "dica" : "atencao" });
        break;
      case "botao": {
        const acao = b.acao === "link" ? "link" : "whatsapp";
        const url = acao === "link" ? linkSeguro(texto(b.url), false) : "";
        if (texto(b.texto) && (acao === "whatsapp" || url)) {
          blocos.push({ tipo: "botao", texto: texto(b.texto), acao, url, mensagem: texto(b.mensagem) });
        }
        break;
      }
      case "video": {
        const embed = embedDoVideo(texto(b.url));
        if (embed) blocos.push({ tipo: "video", embed });
        break;
      }
      case "divisor":
        blocos.push({ tipo: "divisor" });
        break;
    }
  }
  return blocos;
}

export async function listarPosts(): Promise<PostPublico[]> {
  try {
    const res = await fetch(`${CRM_URL}/api/publico/posts`, { next: { revalidate: 60 } });
    if (!res.ok) return [];
    const data = await res.json();
    return (data.posts ?? []) as PostPublico[];
  } catch (err) {
    // CRM fora do ar não pode derrubar o site: o blog fica vazio, o resto vive
    console.error("[blog] falha ao carregar posts:", err);
    return [];
  }
}

export async function buscarPost(slug: string): Promise<PostPublico | null> {
  try {
    const res = await fetch(`${CRM_URL}/api/publico/posts/${encodeURIComponent(slug)}`, {
      next: { revalidate: 60 },
    });
    if (!res.ok) return null;
    const data = await res.json();
    return (data.post ?? null) as PostPublico | null;
  } catch (err) {
    console.error("[blog] falha ao carregar post:", err);
    return null;
  }
}

export function formatarData(iso: string | null): string {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

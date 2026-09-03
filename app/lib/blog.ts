/**
 * Conteúdo do blog, escrito no CRM da Folha.
 *
 * A LP não fala com o banco: lê a rota pública do CRM, que já filtra rascunho.
 * Assim a chave do Supabase não precisa existir neste servidor.
 *
 * `revalidate: 60` é o "tempo real" possível sem deploy — um post publicado
 * aparece aqui em até um minuto, e o site não bate no CRM a cada visita.
 */
const CRM_URL = process.env.CRM_URL || "https://crm-folha-v2.vercel.app";

export type BlocoPost =
  | { tipo: "titulo"; texto: string }
  | { tipo: "paragrafo"; texto: string }
  | { tipo: "imagem"; url: string; legenda?: string };

export interface PostPublico {
  slug: string;
  titulo: string;
  resumo: string | null;
  capa_url: string | null;
  conteudo: BlocoPost[];
  publicado_em: string | null;
  autor: string | null;
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

import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import { ExternalLink, Lightbulb, MessageCircle, TriangleAlert } from "lucide-react";
import WhatsAppCTAButton from "../../../components/WhatsAppCTAButton";
import { buscarPost, formatarData, lerBlocos, type BlocoPost } from "../../../lib/blog";
import { sanitizarTextoRico } from "../../../lib/textoRico";

export const revalidate = 60;

const BOTAO =
  "inline-flex items-center gap-2 rounded-full bg-amber-600 px-9 py-3.5 text-base font-medium text-white transition-colors duration-300 hover:bg-amber-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600";

// mesmas regras do texto no editor do CRM (EditorPost.tsx, CLASSE_TEXTO_POST)
const TEXTO =
  "text-lg leading-relaxed text-ink [&_p+p]:mt-6 [&_p+ul]:mt-4 [&_p+ol]:mt-4 [&_ul+p]:mt-6 [&_ol+p]:mt-6 [&_ul]:list-disc [&_ol]:list-decimal [&_ul]:pl-6 [&_ol]:pl-6 [&_li+li]:mt-2 [&_a]:text-amber-600 [&_a]:underline [&_a]:underline-offset-2 [&_a:hover]:text-amber-700 [&_strong]:font-medium";

function Bloco({ bloco }: { bloco: BlocoPost }) {
  switch (bloco.tipo) {
    case "titulo":
      return bloco.nivel === 3 ? (
        <h3 className="text-xl leading-snug text-forest-950">{bloco.texto}</h3>
      ) : (
        <h2 className="pt-4 text-2xl leading-snug text-forest-950">{bloco.texto}</h2>
      );
    case "texto":
      return <div className={TEXTO} dangerouslySetInnerHTML={{ __html: sanitizarTextoRico(bloco.html) }} />;
    case "paragrafo":
      return (
        // whitespace-pre-line: a quebra de linha que a pessoa deu no CRM
        // é a que ela quis ver aqui
        <p className="whitespace-pre-line text-lg text-ink leading-relaxed">{bloco.texto}</p>
      );
    case "imagem":
      return (
        <figure className={bloco.largura === "media" ? "mx-auto sm:w-2/3" : undefined}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={bloco.url} alt={bloco.alt} loading="lazy" className="w-full rounded-xl" />
          {bloco.legenda && (
            <figcaption className="mt-2 text-center text-sm text-ink-soft">{bloco.legenda}</figcaption>
          )}
        </figure>
      );
    case "citacao":
      return (
        <figure className="border-l-2 border-amber-500 py-1 pl-6">
          <blockquote className="font-display text-2xl leading-snug text-forest-950">
            <p>{bloco.texto}</p>
          </blockquote>
          {bloco.autor && <figcaption className="rotulo mt-3 text-ink-soft">{bloco.autor}</figcaption>}
        </figure>
      );
    case "destaque": {
      const atencao = bloco.tom === "atencao";
      const Icone = atencao ? TriangleAlert : Lightbulb;
      return (
        <aside
          className={`rounded-xl border px-6 py-5 ${atencao ? "border-amber-500/40 bg-amber-500/[0.07]" : "border-forest-700/25 bg-forest-50"}`}
        >
          <p className={`rotulo flex items-center gap-2 ${atencao ? "text-amber-600" : "text-forest-800"}`}>
            <Icone size={15} strokeWidth={1.75} aria-hidden /> {atencao ? "Atenção" : "Dica"}
          </p>
          <p className="mt-2 text-lg leading-relaxed text-ink">{bloco.texto}</p>
        </aside>
      );
    }
    case "botao":
      return (
        <div>
          {bloco.acao === "whatsapp" ? (
            <WhatsAppCTAButton
              message={bloco.mensagem || "Olá! Li um artigo no blog da Folha e quero falar sobre o meu caso."}
              eventLabel="blog_bloco_whatsapp"
              className={BOTAO}
            >
              <MessageCircle size={18} aria-hidden /> {bloco.texto}
            </WhatsAppCTAButton>
          ) : (
            <a href={bloco.url} target="_blank" rel="noopener noreferrer" className={BOTAO}>
              <ExternalLink size={17} aria-hidden /> {bloco.texto}
              <span className="sr-only"> (abre em outra aba)</span>
            </a>
          )}
        </div>
      );
    case "video":
      return (
        <div className="relative aspect-video overflow-hidden rounded-xl bg-forest-950">
          <iframe
            src={bloco.embed}
            title="Vídeo do artigo"
            loading="lazy"
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            allowFullScreen
            referrerPolicy="strict-origin-when-cross-origin"
            className="absolute inset-0 h-full w-full border-0"
          />
        </div>
      );
    case "divisor":
      return <hr className="fio border-0" />;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await buscarPost(slug);
  if (!post) return { title: "Artigo não encontrado | Folha Soluções Ambientais" };
  return {
    title: `${post.titulo} | Folha Soluções Ambientais`,
    description: post.resumo ?? undefined,
    openGraph: {
      title: post.titulo,
      description: post.resumo ?? undefined,
      images: post.capa_url ? [post.capa_url] : undefined,
      type: "article",
    },
  };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await buscarPost(slug);
  if (!post) notFound();

  return (
    <>
      <Header />
      <main className="bg-paper pt-32 pb-24">
        <article className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl">
            <Link href="/blog" className="text-sm font-semibold text-forest-800 hover:text-amber-600">
              ← Todos os artigos
            </Link>

            <time className="rotulo mt-8 block text-amber-600">
              {formatarData(post.publicado_em)}
            </time>
            <h1 className="mt-3 text-[clamp(2.25rem,5.2vw,4rem)] font-semibold leading-[1.02] text-forest-950">
              {post.titulo}
            </h1>
            {post.resumo && (
              <p className="mt-5 text-lg text-ink-soft leading-relaxed">{post.resumo}</p>
            )}
            {post.autor && (
              <p className="mt-4 text-sm text-ink-soft">Por {post.autor}</p>
            )}
          </div>

          {post.capa_url && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.capa_url}
              alt=""
              className="mx-auto mt-10 w-full max-w-4xl object-cover"
            />
          )}

          {/* cada bloco vira um componente; o único HTML é o texto rico, que é
              sanitizado de novo aqui antes de ir para a tela */}
          <div className="mx-auto mt-12 max-w-2xl space-y-6">
            {lerBlocos(post).map((bloco, i) => (
              <Bloco key={i} bloco={bloco} />
            ))}
          </div>

          <div className="mx-auto mt-16 max-w-2xl bg-forest-950 px-8 py-12 text-center">
            <p className="text-2xl font-semibold leading-snug text-white">
              Precisa regularizar a sua empresa?
            </p>
            <p className="mt-2 text-forest-100">
              Fale com a nossa equipe e receba um diagnóstico do seu caso.
            </p>
            <div className="mt-6 flex justify-center">
              <WhatsAppCTAButton
                message="Olá! Vim pelo blog da Folha e gostaria de falar sobre licenciamento ambiental."
                eventLabel="blog_post_cta"
                className={BOTAO}
              >
                Falar com um especialista
              </WhatsAppCTAButton>
            </div>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}

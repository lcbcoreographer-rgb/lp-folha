import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import WhatsAppCTAButton from "../../../components/WhatsAppCTAButton";
import { buscarPost, formatarData } from "../../../lib/blog";

export const revalidate = 60;

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

          {/* cada bloco vira um componente: nada do que foi digitado no CRM é
              interpretado como HTML aqui */}
          <div className="mx-auto mt-12 max-w-2xl space-y-6">
            {post.conteudo.map((bloco, i) => {
              if (bloco.tipo === "titulo") {
                return (
                  <h2 key={i} className="pt-4 text-2xl font-semibold leading-snug text-forest-950">
                    {bloco.texto}
                  </h2>
                );
              }
              if (bloco.tipo === "imagem") {
                return (
                  <figure key={i}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={bloco.url} alt={bloco.legenda ?? ""} className="w-full rounded-xl" />
                    {bloco.legenda && (
                      <figcaption className="mt-2 text-center text-sm text-ink-soft">
                        {bloco.legenda}
                      </figcaption>
                    )}
                  </figure>
                );
              }
              return (
                // whitespace-pre-line: a quebra de linha que a pessoa deu no CRM
                // é a que ela quis ver aqui
                <p key={i} className="whitespace-pre-line text-lg text-ink leading-relaxed">
                  {bloco.texto}
                </p>
              );
            })}
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

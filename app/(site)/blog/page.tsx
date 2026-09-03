import type { Metadata } from "next";
import Link from "next/link";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { listarPosts, formatarData } from "../../lib/blog";

export const metadata: Metadata = {
  title: "Blog | Folha Soluções Ambientais",
  description:
    "Notícias, prazos e orientações sobre licenciamento ambiental no Paraná, escritos pela equipe da Folha.",
};

// o conteúdo vem do CRM; sem isso a página congelaria no primeiro build
export const revalidate = 60;

export default async function BlogPage() {
  const posts = await listarPosts();

  return (
    <>
      <Header />
      <main className="bg-paper pt-32 pb-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <header className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wider text-amber-600">Blog</p>
            <h1 className="mt-2 text-4xl sm:text-5xl font-bold text-forest-950 tracking-tight">
              Licenciamento sem susto
            </h1>
            <p className="mt-4 text-lg text-ink-soft leading-relaxed">
              Prazos, mudanças na legislação e o que a fiscalização tem cobrado — explicado por
              quem faz o processo todo dia.
            </p>
          </header>

          {posts.length === 0 ? (
            <p className="mt-16 text-ink-soft">Nenhum artigo publicado ainda. Volte em breve.</p>
          ) : (
            <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-[0_1px_0_0_rgba(11,61,46,0.08)] transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                >
                  {post.capa_url && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.capa_url}
                      alt=""
                      className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  )}
                  <div className="flex flex-1 flex-col p-6">
                    <time className="text-xs font-medium uppercase tracking-wide text-amber-600">
                      {formatarData(post.publicado_em)}
                    </time>
                    <h2 className="mt-2 text-xl font-bold text-forest-950 leading-snug">
                      {post.titulo}
                    </h2>
                    {post.resumo && (
                      <p className="mt-2 flex-1 text-sm text-ink-soft leading-relaxed">
                        {post.resumo}
                      </p>
                    )}
                    <span className="mt-4 text-sm font-semibold text-forest-800">
                      Ler artigo →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}

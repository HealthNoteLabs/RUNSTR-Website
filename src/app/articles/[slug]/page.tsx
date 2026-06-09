import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { notFound } from "next/navigation";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui";
import { getAllSlugs, getArticleBySlug } from "@/lib/articles";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <Header />
      <main className="pt-16">
        <article className="py-20">
          <Container>
            <div className="max-w-2xl mx-auto">
              <Link
                href="/articles"
                className="text-sm text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors"
              >
                &larr; All articles
              </Link>
              <h1 className="font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mt-6 mb-8">
                {article.title}
              </h1>
              <div className="article-prose text-[var(--text-secondary)] leading-relaxed space-y-6">
                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                  {article.content}
                </ReactMarkdown>
              </div>
            </div>
          </Container>
        </article>
      </main>
      <Footer />
    </>
  );
}

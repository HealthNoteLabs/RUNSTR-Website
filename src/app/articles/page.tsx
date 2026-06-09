import Link from "next/link";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="py-20">
          <Container>
            <h1 className="font-display text-5xl sm:text-6xl tracking-tight text-[var(--foreground)] mb-4">
              ARTICLES
            </h1>
            <p className="text-lg text-[var(--text-secondary)] max-w-2xl mb-12">
              Honest, practical strategy for staying in the fight. No fluff, no
              toxic positivity.
            </p>
            <div className="grid gap-6 max-w-3xl">
              {articles.map((a) => (
                <Link
                  key={a.slug}
                  href={`/articles/${a.slug}`}
                  className="block p-6 rounded-2xl bg-[var(--background-card)] border border-[var(--border)] hover:border-[var(--accent)] transition-colors duration-300"
                >
                  <h2 className="font-display text-2xl tracking-wide text-[var(--foreground)] mb-2">
                    {a.title}
                  </h2>
                  <p className="text-[var(--text-secondary)] leading-relaxed">
                    {a.excerpt}
                  </p>
                </Link>
              ))}
              {articles.length === 0 && (
                <p className="text-[var(--text-muted)]">More writing coming soon.</p>
              )}
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

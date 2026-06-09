import { Header, Footer } from "@/components/layout";
import { Container, Button } from "@/components/ui";
import { YOUTUBE_URL } from "@/lib/constants";

export default function MusicPage() {
  return (
    <>
      <Header />
      <main className="pt-16">
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[var(--accent)]/8 rounded-full blur-[160px]" />
          <Container className="relative z-10 py-20 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--background-card)] border border-[var(--border)] mb-8">
              <span className="w-2 h-2 bg-[var(--accent)] rounded-full animate-pulse" />
              <span className="text-sm text-[var(--text-secondary)]">Coming Soon</span>
            </div>
            <h1 className="font-display text-6xl sm:text-7xl md:text-8xl tracking-tight text-[var(--foreground)] mb-6">
              BURNOUT RADIO
            </h1>
            <p className="text-lg sm:text-xl text-[var(--text-secondary)] max-w-2xl mx-auto leading-relaxed mb-10">
              Calm but focused lo-fi made to lock into. The soundtrack for deep
              work, long study sessions, and hard training. Built to keep you
              steady instead of frantic and fried.
            </p>
            <Button href={YOUTUBE_URL} external size="lg">
              Listen on YouTube
            </Button>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

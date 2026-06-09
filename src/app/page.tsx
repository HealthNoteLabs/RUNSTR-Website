import { Header, Footer } from "@/components/layout";
import { BrandHero, GoodBurn, PillarCards } from "@/components/sections";
import { Container, EmailSignup } from "@/components/ui";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <BrandHero />
        <GoodBurn />
        <PillarCards />
        <section className="relative py-24 border-t border-[var(--border)]/50">
          <Container>
            <div className="max-w-2xl mx-auto text-center">
              <h2 className="font-display text-4xl sm:text-5xl tracking-tight text-[var(--foreground)] mb-4">
                RESIST THE BURNOUT
              </h2>
              <p className="text-lg text-[var(--text-secondary)] mb-8">
                Get the strategy in your inbox. Keep going long after others tap out.
              </p>
              <div className="flex justify-center">
                <EmailSignup />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </>
  );
}

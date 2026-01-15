import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Container } from "@/components/ui";

export const metadata: Metadata = {
  title: "Privacy Policy - RUNSTR",
  description: "RUNSTR privacy policy. Learn how we protect your data and respect your privacy.",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold mb-8">
              <span className="text-[var(--foreground)]">Privacy </span>
              <span className="text-[var(--accent)]">Policy</span>
            </h1>

            <p className="text-[var(--text-secondary)] mb-8">
              Last updated: January 2026
            </p>

            <div className="prose prose-invert max-w-none space-y-8">
              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Our Commitment to Privacy
                </h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  RUNSTR is built on a simple principle: your fitness data belongs to you.
                  We don&apos;t collect, store, or sell your personal information. Period.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  What Data Stays on Your Device
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                  <li>All workout data (routes, times, distances)</li>
                  <li>Your fitness history and statistics</li>
                  <li>App preferences and settings</li>
                  <li>Any profile information you create</li>
                </ul>
                <p className="text-[var(--text-secondary)] mt-4">
                  This data is stored locally on your device and is never automatically
                  uploaded to any server.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  What We Don&apos;t Collect
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                  <li>Email addresses</li>
                  <li>Phone numbers</li>
                  <li>Real names</li>
                  <li>Location data (except temporarily during active workouts, stored only on device)</li>
                  <li>Device identifiers for tracking</li>
                  <li>Usage analytics that identify you</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Anonymous Accounts
                </h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  RUNSTR uses anonymous accounts. You don&apos;t need to provide any personal
                  information to use the app. Your identity is represented by a cryptographic
                  key that you control, not by personal details.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Optional Data Sharing
                </h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you choose to participate in competitions or share your workouts publicly,
                  only the data you explicitly choose to share becomes visible. You always
                  have full control over what you share and can delete shared data at any time.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Third-Party Integrations
                </h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  If you connect RUNSTR to third-party services (like Apple Health or fitness
                  devices), data sharing with those services is governed by their respective
                  privacy policies. We recommend reviewing their policies before connecting.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Open Source Transparency
                </h2>
                <p className="text-[var(--text-secondary)] mb-4">
                  RUNSTR is open source. You can review our code to verify our privacy claims.
                  We believe transparency is the foundation of trust.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Your Rights
                </h2>
                <ul className="list-disc pl-6 space-y-2 text-[var(--text-secondary)]">
                  <li>You own all your data</li>
                  <li>You can export your data at any time</li>
                  <li>You can delete all app data by uninstalling the app</li>
                  <li>You can use the app without creating any account</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold text-[var(--foreground)] mb-4">
                  Contact Us
                </h2>
                <p className="text-[var(--text-secondary)]">
                  If you have any questions about this privacy policy, please contact us
                  through our contact page.
                </p>
              </section>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

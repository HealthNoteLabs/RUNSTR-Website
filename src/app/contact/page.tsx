import { Metadata } from "next";
import { Header, Footer } from "@/components/layout";
import { Container, Card } from "@/components/ui";
import { GITHUB_URL } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Contact - RUNSTR",
  description: "Get in touch with the RUNSTR team. We'd love to hear from you.",
};

const contactMethods = [
  {
    title: "GitHub Issues",
    description: "Report bugs or request features",
    href: `${GITHUB_URL}/issues`,
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    title: "GitHub Discussions",
    description: "Ask questions and connect with the community",
    href: `${GITHUB_URL}/discussions`,
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
      </svg>
    ),
  },
  {
    title: "Email",
    description: "For general inquiries",
    href: "mailto:hello@runstr.club",
    icon: (
      <svg
        className="w-6 h-6"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
        />
      </svg>
    ),
  },
];

export default function ContactPage() {
  return (
    <>
      <Header />
      <main className="pt-24 pb-16">
        <Container>
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl font-bold mb-4">
                <span className="text-[var(--foreground)]">Get in </span>
                <span className="text-[var(--accent)]">Touch</span>
              </h1>
              <p className="text-[var(--text-secondary)]">
                Have questions, feedback, or just want to say hi? We&apos;d love to hear from you.
              </p>
            </div>

            <div className="grid gap-6">
              {contactMethods.map((method) => (
                <a
                  key={method.title}
                  href={method.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  <Card className="flex items-center gap-4 p-6">
                    <div className="text-[var(--accent)]">{method.icon}</div>
                    <div>
                      <h2 className="font-bold text-[var(--foreground)]">
                        {method.title}
                      </h2>
                      <p className="text-sm text-[var(--text-secondary)]">
                        {method.description}
                      </p>
                    </div>
                    <svg
                      className="w-5 h-5 ml-auto text-[var(--text-muted)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Card>
                </a>
              ))}
            </div>

            <div className="mt-12 text-center">
              <p className="text-[var(--text-muted)] text-sm">
                Prefer to contribute directly? Check out our{" "}
                <a
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[var(--accent)] hover:underline"
                >
                  GitHub repository
                </a>
                .
              </p>
            </div>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}

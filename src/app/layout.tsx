import type { Metadata } from "next";
import { Outfit, Bebas_Neue } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
});

const bebasNeue = Bebas_Neue({
  variable: "--font-display",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "No Burnout — Push Hard. Don't Break.",
  description:
    "No Burnout is a toolkit for people who work hard and intend to keep working hard, without burning out. Strategy, focus music, and the Ember fitness app, in one place.",
  keywords: ["burnout", "resilience", "endurance", "focus music", "lofi", "fitness", "stamina", "deep work", "ember"],
  authors: [{ name: "No Burnout" }],
  openGraph: {
    title: "No Burnout — Push Hard. Don't Break.",
    description:
      "Strategy, focus music, and the Ember fitness app. Resist the burnout. Go the distance.",
    url: "https://www.runstr.club",
    siteName: "No Burnout",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "No Burnout — Push Hard. Don't Break.",
    description: "Resist the burnout. Go the distance.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${outfit.variable} ${bebasNeue.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

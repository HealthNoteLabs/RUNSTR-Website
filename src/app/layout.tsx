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
  title: "RUNSTR - Anonymous Fitness Tracking",
  description: "Track any workout. Earn rewards. Compete daily. No account required. The privacy-first fitness app that works with any device you already use.",
  keywords: ["fitness", "running", "walking", "cycling", "anonymous", "privacy", "charity", "workout tracker", "competitions", "leaderboards", "fitness clubs"],
  authors: [{ name: "RUNSTR" }],
  openGraph: {
    title: "RUNSTR - Anonymous Fitness Tracking",
    description: "Track any workout. Earn rewards. Compete daily. No account required.",
    url: "https://www.runstr.club",
    siteName: "RUNSTR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUNSTR - Anonymous Fitness Tracking",
    description: "Track any workout. Earn rewards. Compete daily. No account required.",
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

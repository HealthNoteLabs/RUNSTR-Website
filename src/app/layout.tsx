import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "RUNSTR - Anonymous Fitness Tracking",
  description: "Track your workouts. Support great causes. No personal data required. The privacy-first fitness app that lets you contribute to charities with every workout.",
  keywords: ["fitness", "running", "walking", "cycling", "anonymous", "privacy", "charity", "workout tracker"],
  authors: [{ name: "RUNSTR" }],
  openGraph: {
    title: "RUNSTR - Anonymous Fitness Tracking",
    description: "Track your workouts. Support great causes. No personal data required.",
    url: "https://www.runstr.club",
    siteName: "RUNSTR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RUNSTR - Anonymous Fitness Tracking",
    description: "Track your workouts. Support great causes. No personal data required.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}

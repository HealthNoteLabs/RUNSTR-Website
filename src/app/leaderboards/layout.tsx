import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboards | RUNSTR",
  description:
    "Live competition leaderboards and daily records on RUNSTR — the anonymous fitness tracking app.",
};

export default function LeaderboardsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

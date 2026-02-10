import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "RUNSTR Pro",
  description:
    "Upgrade to RUNSTR Pro — unlock team and event creation with a simple monthly subscription.",
};

export default function ProLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

"use client";

import { useState, useEffect, useCallback } from "react";
import { Header } from "@/components/layout";
import { Footer } from "@/components/layout";
import { Container, Card } from "@/components/ui";
import { supabase } from "@/lib/supabase";
import { KNOWN_PARTICIPANT_MAP } from "@/lib/participants";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface DailyEntry {
  npub: string;
  name: string;
  picture: string | null;
  value: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTime(seconds: number): string {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.round(seconds % 60);
  if (h > 0)
    return `${h}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  return `${m}:${String(s).padStart(2, "0")}`;
}

function formatNumber(n: number): string {
  return n.toLocaleString();
}

// ---------------------------------------------------------------------------
// Avatar
// ---------------------------------------------------------------------------

function Avatar({ name, picture }: { name: string; picture: string | null }) {
  if (picture) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={picture}
        alt={name}
        className="w-8 h-8 rounded-full object-cover flex-shrink-0"
      />
    );
  }
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/images/logo.png"
      alt={name}
      className="w-8 h-8 rounded-full object-cover flex-shrink-0"
    />
  );
}

// ---------------------------------------------------------------------------
// Rank badge for top 3
// ---------------------------------------------------------------------------

function RankBadge({ rank }: { rank: number }) {
  if (rank <= 3) {
    return (
      <span
        className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-bold ${
          rank === 1
            ? "bg-[var(--accent)] text-black"
            : "bg-[var(--accent)]/20 text-[var(--accent)]"
        }`}
        title={`${rank}${rank === 1 ? "st" : rank === 2 ? "nd" : "rd"}`}
      >
        {rank}
      </span>
    );
  }
  return (
    <span className="text-sm text-[var(--text-secondary)] w-6 text-center">
      {rank}
    </span>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default function LeaderboardsPage() {
  const [error, setError] = useState<string | null>(null);

  // Daily records state
  const [dailyBoards, setDailyBoards] = useState<
    { title: string; unit: string; entries: DailyEntry[] }[]
  >([]);
  const [dailyLoading, setDailyLoading] = useState(true);

  // ---------- Fetch daily records ----------
  const fetchDailyRecords = useCallback(async () => {
    setDailyLoading(true);
    try {
      const today = new Date().toISOString().split("T")[0];
      const { data, error: err } = await supabase
        .from("workout_submissions")
        .select(
          "npub, profile_name, profile_picture, time_5k_seconds, time_10k_seconds, time_half_seconds, time_marathon_seconds, step_count",
        )
        .eq("leaderboard_date", today)
        .eq("source", "app")
        .limit(10000);
      if (err) throw err;

      const rows = data || [];

      const boardDefs: {
        title: string;
        field: string;
        asc: boolean;
        unit: string;
        fmt: (v: number) => string;
      }[] = [
        {
          title: "Fastest 5K",
          field: "time_5k_seconds",
          asc: true,
          unit: "time",
          fmt: formatTime,
        },
        {
          title: "Fastest 10K",
          field: "time_10k_seconds",
          asc: true,
          unit: "time",
          fmt: formatTime,
        },
        {
          title: "Fastest Half Marathon",
          field: "time_half_seconds",
          asc: true,
          unit: "time",
          fmt: formatTime,
        },
        {
          title: "Fastest Marathon",
          field: "time_marathon_seconds",
          asc: true,
          unit: "time",
          fmt: formatTime,
        },
        {
          title: "Most Steps",
          field: "step_count",
          asc: false,
          unit: "steps",
          fmt: formatNumber,
        },
      ];

      const boards = boardDefs.map((def) => {
        type Row = (typeof rows)[number];
        const valid = rows.filter(
          (r) =>
            (r as Record<string, unknown>)[def.field] != null &&
            (r as Record<string, unknown>)[def.field] !== 0,
        );

        // Deduplicate by npub (keep best per user)
        const best: Record<string, Row> = {};
        for (const r of valid) {
          const val = (r as Record<string, unknown>)[def.field] as number;
          const existing = best[r.npub];
          if (!existing) {
            best[r.npub] = r;
          } else {
            const existingVal = (existing as Record<string, unknown>)[
              def.field
            ] as number;
            if (def.asc ? val < existingVal : val > existingVal) {
              best[r.npub] = r;
            }
          }
        }

        const entries: DailyEntry[] = Object.values(best)
          .map((r) => {
            const known = KNOWN_PARTICIPANT_MAP.get(r.npub);
            return {
              npub: r.npub,
              name: known?.name || r.profile_name || "Anonymous",
              picture: known?.picture || r.profile_picture || null,
              value: (r as Record<string, unknown>)[def.field] as number,
            };
          })
          .sort((a, b) => (def.asc ? a.value - b.value : b.value - a.value))
          .slice(0, 20);

        return {
          title: def.title,
          unit: def.unit,
          entries,
        };
      });

      setDailyBoards(boards);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to load daily records",
      );
    } finally {
      setDailyLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyRecords();
  }, [fetchDailyRecords]);

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen">
        <Container>
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl mb-3">
              <span className="text-[var(--foreground)]">DAILY </span>
              <span className="text-gradient">LEADERBOARDS</span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Today&apos;s best performances across all athletes &mdash;{" "}
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm text-center">
              {error}
            </div>
          )}

          {dailyLoading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {dailyBoards.map((board) => (
                <Card key={board.title} hover={false}>
                  <h3 className="text-sm font-bold text-[var(--foreground)] mb-3 flex items-center gap-2">
                    {board.title}
                  </h3>
                  {board.entries.length === 0 ? (
                    <p className="text-xs text-[var(--text-muted)] py-4 text-center">
                      No records yet today
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {board.entries.slice(0, 5).map((entry, i) => (
                        <div
                          key={entry.npub}
                          className="flex items-center gap-3"
                        >
                          <RankBadge rank={i + 1} />
                          <Avatar
                            name={entry.name}
                            picture={entry.picture}
                          />
                          <span className="text-sm text-[var(--text-secondary)] flex-1 truncate">
                            {entry.name}
                          </span>
                          <span className="text-sm font-medium text-[var(--accent)] tabular-nums">
                            {board.unit === "time"
                              ? formatTime(entry.value)
                              : formatNumber(entry.value)}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </Card>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

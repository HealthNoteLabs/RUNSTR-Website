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

interface Competition {
  id: string;
  external_id: string;
  name: string;
  description: string;
  activity_type: string;
  scoring_method: string;
  start_date: string;
  end_date: string;
  prize_pool_sats: number;
}

interface LeaderboardEntry {
  rank: number;
  npub: string;
  name: string;
  picture: string | null;
  score: number; // km
  workoutCount: number;
}

interface DailyEntry {
  npub: string;
  name: string;
  picture: string | null;
  value: number;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatKm(km: number): string {
  if (km >= 1000) return `${(km / 1000).toFixed(1)}k km`;
  if (km >= 100) return `${km.toFixed(0)} km`;
  return `${km.toFixed(1)} km`;
}

function formatSats(sats: number): string {
  return sats.toLocaleString() + " sats";
}

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

function isActive(comp: Competition): boolean {
  return new Date(comp.end_date) > new Date();
}

function formatDateRange(start: string, end: string): string {
  const s = new Date(start);
  const e = new Date(end);
  const sOpts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  const eOpts: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
  };
  return `${s.toLocaleDateString("en-US", sOpts)} – ${e.toLocaleDateString("en-US", eOpts)}`;
}

function activityLabel(type: string): string {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

// The main "season-ii" entry overlaps with the sub-competitions — hide it.
const HIDDEN_IDS = new Set(["season-ii"]);

// Season II sub-competitions inherit the main entry's prize pool.
const SEASON2_PRIZE_SATS = 500_000;
const SEASON2_SUB_IDS = new Set([
  "season2-running",
  "season2-walking",
  "season2-cycling",
]);

function displayPrize(comp: Competition): number {
  if (SEASON2_SUB_IDS.has(comp.external_id)) return SEASON2_PRIZE_SATS;
  return comp.prize_pool_sats;
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
// Loading skeleton
// ---------------------------------------------------------------------------

function SkeletonRow() {
  return (
    <tr className="border-b border-[var(--border)]">
      <td className="py-3 px-2">
        <div className="h-4 w-6 bg-[var(--background-card-hover)] rounded animate-pulse" />
      </td>
      <td className="py-3 px-2">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-[var(--background-card-hover)] animate-pulse" />
          <div className="h-4 w-24 bg-[var(--background-card-hover)] rounded animate-pulse" />
        </div>
      </td>
      <td className="py-3 px-2">
        <div className="h-4 w-16 bg-[var(--background-card-hover)] rounded animate-pulse" />
      </td>
      <td className="py-3 px-2 hidden sm:table-cell">
        <div className="h-4 w-8 bg-[var(--background-card-hover)] rounded animate-pulse" />
      </td>
    </tr>
  );
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

type View = "competition" | "daily";

export default function LeaderboardsPage() {
  const [allComps, setAllComps] = useState<Competition[]>([]);
  const [selected, setSelected] = useState<Competition | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [participantCounts, setParticipantCounts] = useState<
    Record<string, number>
  >({});
  const [view, setView] = useState<View>("competition");
  const [loading, setLoading] = useState(true);
  const [lbLoading, setLbLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Daily records state
  const [dailyBoards, setDailyBoards] = useState<
    { title: string; unit: string; entries: DailyEntry[] }[]
  >([]);
  const [dailyLoading, setDailyLoading] = useState(false);
  const [showAll, setShowAll] = useState(false);

  const INITIAL_SHOW = 21;

  // Filtered competition lists
  const displayComps = allComps.filter(
    (c) => !HIDDEN_IDS.has(c.external_id),
  );
  const activeComps = displayComps.filter(isActive);
  const completedComps = displayComps.filter((c) => !isActive(c));

  // ---------- Fetch competitions on mount ----------
  useEffect(() => {
    (async () => {
      try {
        const { data, error: err } = await supabase
          .from("competitions")
          .select("*")
          .order("start_date", { ascending: false });
        if (err) throw err;
        const comps: Competition[] = data || [];
        setAllComps(comps);

        // Auto-select first active (visible) competition
        const visible = comps.filter(
          (c) => !HIDDEN_IDS.has(c.external_id) && isActive(c),
        );
        if (visible.length > 0) setSelected(visible[0]);
        else {
          const ended = comps.filter(
            (c) => !HIDDEN_IDS.has(c.external_id),
          );
          if (ended.length > 0) setSelected(ended[0]);
        }

        // Fetch participant counts in parallel
        const counts: Record<string, number> = {};
        await Promise.all(
          comps.map(async (c) => {
            const { count } = await supabase
              .from("competition_participants")
              .select("*", { count: "exact", head: true })
              .eq("competition_id", c.id);
            counts[c.id] = count ?? 0;
          }),
        );
        setParticipantCounts(counts);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load competitions");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  // ---------- Fetch leaderboard when selection changes ----------
  const fetchLeaderboard = useCallback(async (comp: Competition) => {
    setLbLoading(true);
    setError(null);
    try {
      // 1. Participants
      const { data: participants, error: pErr } = await supabase
        .from("competition_participants")
        .select("npub, name, picture")
        .eq("competition_id", comp.id);
      if (pErr) throw pErr;
      if (!participants?.length) {
        setLeaderboard([]);
        return;
      }

      const startDate = comp.start_date.split("T")[0];
      const endDate = comp.end_date.split("T")[0];

      // 2. All workouts in the date range (both sources) for dedup
      const { data: workouts, error: wErr } = await supabase
        .from("workout_submissions")
        .select(
          "npub, distance_meters, source, leaderboard_date, profile_name, profile_picture",
        )
        .eq("activity_type", comp.activity_type)
        .gte("leaderboard_date", startDate)
        .lte("leaderboard_date", endDate)
        .limit(50000);
      if (wErr) throw wErr;

      // 3. Filter to participants only
      const npubSet = new Set(participants.map((p) => p.npub));
      const relevant = (workouts || []).filter((w) => npubSet.has(w.npub));

      // 4. Deduplicate: per npub+date, prefer "app" source over "nostr_scan"
      //    to avoid double-counting while still including scan-only entries.
      type WorkoutRow = (typeof relevant)[number];
      const byNpubDate: Record<string, WorkoutRow[]> = {};
      for (const w of relevant) {
        const key = `${w.npub}|${w.leaderboard_date}`;
        if (!byNpubDate[key]) byNpubDate[key] = [];
        byNpubDate[key].push(w);
      }

      const deduped: WorkoutRow[] = [];
      for (const rows of Object.values(byNpubDate)) {
        const appRows = rows.filter((r) => r.source === "app");
        if (appRows.length > 0) {
          deduped.push(...appRows);
        } else {
          // No app submissions for this npub+date — use scan rows,
          // but deduplicate identical distances (scan sometimes duplicates)
          const seen = new Set<string>();
          for (const r of rows) {
            const sig = `${r.distance_meters}`;
            if (!seen.has(sig)) {
              seen.add(sig);
              deduped.push(r);
            }
          }
        }
      }

      // 5. Aggregate
      const agg: Record<
        string,
        {
          meters: number;
          count: number;
          profileName: string | null;
          profilePicture: string | null;
        }
      > = {};
      for (const w of deduped) {
        if (!agg[w.npub]) {
          agg[w.npub] = {
            meters: 0,
            count: 0,
            profileName: null,
            profilePicture: null,
          };
        }
        agg[w.npub].meters += w.distance_meters || 0;
        agg[w.npub].count += 1;
        if (w.profile_name) agg[w.npub].profileName = w.profile_name;
        if (w.profile_picture) agg[w.npub].profilePicture = w.profile_picture;
      }

      // 6. Build ranked list — only include participants with at least one workout
      const isGenericName = (n: string | null | undefined) =>
        !n || n === "Season II Participant" || n === "Anonymous Athlete";

      const entries = participants
        .filter((p) => agg[p.npub] && agg[p.npub].meters > 0)
        .map((p) => {
          const known = KNOWN_PARTICIPANT_MAP.get(p.npub);
          return {
            rank: 0,
            npub: p.npub,
            name:
              known?.name ||
              (!isGenericName(p.name) ? p.name : null) ||
              agg[p.npub]?.profileName ||
              "Anonymous",
            picture:
              known?.picture ||
              p.picture ||
              agg[p.npub]?.profilePicture ||
              null,
            score: (agg[p.npub]?.meters || 0) / 1000,
            workoutCount: agg[p.npub]?.count || 0,
          };
        })
        .sort((a, b) => b.score - a.score)
        .map((e, i) => ({ ...e, rank: i + 1 }));

      setLeaderboard(entries);
      setShowAll(false);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to load leaderboard",
      );
    } finally {
      setLbLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selected && view === "competition") {
      fetchLeaderboard(selected);
    }
  }, [selected, view, fetchLeaderboard]);

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
        // Filter rows with non-null, non-zero values
        type Row = (typeof rows)[number];
        const valid = rows.filter(
          (r) => (r as Record<string, unknown>)[def.field] != null && (r as Record<string, unknown>)[def.field] !== 0,
        );

        // Deduplicate by npub (keep best per user)
        const best: Record<string, Row> = {};
        for (const r of valid) {
          const val = (r as Record<string, unknown>)[def.field] as number;
          const existing = best[r.npub];
          if (!existing) {
            best[r.npub] = r;
          } else {
            const existingVal = (existing as Record<string, unknown>)[def.field] as number;
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
          entries: entries.map((e) => ({
            ...e,
            value: e.value, // keep raw for display
            displayValue: def.fmt(e.value),
          })),
        };
      });

      setDailyBoards(
        boards.map((b) => ({
          title: b.title,
          unit: b.unit,
          entries: b.entries,
        })),
      );
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Failed to load daily records",
      );
    } finally {
      setDailyLoading(false);
    }
  }, []);

  useEffect(() => {
    if (view === "daily") {
      fetchDailyRecords();
    }
  }, [view, fetchDailyRecords]);

  // ---------- Render ----------

  return (
    <>
      <Header />
      <main className="pt-24 pb-20 min-h-screen">
        <Container>
          {/* Page Header */}
          <div className="text-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="text-[var(--accent)]">Leaderboards</span>
            </h1>
            <p className="text-[var(--text-secondary)] max-w-xl mx-auto">
              Download the app to join.
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-lg bg-[var(--accent)]/10 border border-[var(--accent)]/30 text-[var(--accent)] text-sm text-center">
              {error}
            </div>
          )}

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="w-8 h-8 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
            </div>
          ) : (
            <>
              {/* ---- Competition Selector ---- */}
              <div className="mb-8 space-y-4">
                {/* Active competitions */}
                {activeComps.length > 0 && (
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 font-medium">
                      Active Competitions
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {activeComps.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelected(c);
                            setView("competition");
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            view === "competition" &&
                            selected?.id === c.id
                              ? "bg-[var(--accent)] text-black"
                              : "bg-[var(--background-card)] text-[var(--text-secondary)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)]"
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                            {c.name}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Completed competitions */}
                {completedComps.length > 0 && (
                  <div>
                    <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 font-medium">
                      Completed
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {completedComps.map((c) => (
                        <button
                          key={c.id}
                          onClick={() => {
                            setSelected(c);
                            setView("competition");
                          }}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                            view === "competition" &&
                            selected?.id === c.id
                              ? "bg-[var(--accent)] text-black"
                              : "bg-[var(--background-card)] text-[var(--text-muted)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--border-hover)]"
                          }`}
                        >
                          {c.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Daily Records */}
                <div>
                  <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider mb-2 font-medium">
                    Records
                  </div>
                  <button
                    onClick={() => setView("daily")}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      view === "daily"
                        ? "bg-[var(--accent)] text-black"
                        : "bg-[var(--background-card)] text-[var(--text-secondary)] hover:text-[var(--foreground)] border border-[var(--border)] hover:border-[var(--accent)]"
                    }`}
                  >
                    Daily Records
                  </button>
                </div>
              </div>

              {/* ---- Competition View ---- */}
              {view === "competition" && selected && (
                <div>
                  {/* Competition Header Card */}
                  <Card hover={false} className="mb-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                      <div>
                        <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
                          {selected.name}
                        </h2>
                        <div className="flex flex-wrap items-center gap-3 text-sm text-[var(--text-secondary)]">
                          <span className="flex items-center gap-1.5">
                            <span
                              className={`px-2 py-0.5 rounded text-xs font-medium ${
                                isActive(selected)
                                  ? "bg-[var(--accent)]/10 text-[var(--accent)]"
                                  : "bg-[var(--text-muted)]/10 text-[var(--text-muted)]"
                              }`}
                            >
                              {isActive(selected) ? "Active" : "Completed"}
                            </span>
                          </span>
                          <span>
                            {activityLabel(selected.activity_type)}
                          </span>
                          <span>
                            {formatDateRange(
                              selected.start_date,
                              selected.end_date,
                            )}
                          </span>
                          {participantCounts[selected.id] != null && (
                            <span>
                              {participantCounts[selected.id]} participants
                            </span>
                          )}
                        </div>
                      </div>
                      {displayPrize(selected) > 0 && (
                        <div className="text-right">
                          <div className="text-xs text-[var(--text-muted)] uppercase tracking-wider">
                            Prize Pool
                          </div>
                          <div className="text-lg font-bold text-[var(--accent)]">
                            {formatSats(displayPrize(selected))}
                          </div>
                        </div>
                      )}
                    </div>
                  </Card>

                  {/* Leaderboard Table */}
                  {lbLoading ? (
                    <Card hover={false}>
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--text-muted)] uppercase tracking-wider">
                            <th className="py-3 px-2 w-12">#</th>
                            <th className="py-3 px-2">Athlete</th>
                            <th className="py-3 px-2 text-right">Distance</th>
                            <th className="py-3 px-2 text-right hidden sm:table-cell">
                              Workouts
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {Array.from({ length: 10 }).map((_, i) => (
                            <SkeletonRow key={i} />
                          ))}
                        </tbody>
                      </table>
                    </Card>
                  ) : leaderboard.length === 0 ? (
                    <Card hover={false}>
                      <p className="text-center text-[var(--text-muted)] py-8">
                        No workouts submitted yet.
                      </p>
                    </Card>
                  ) : (
                    <>
                      {/* Participant summary */}
                      <div className="flex items-center justify-between mb-3 px-1">
                        <p className="text-xs text-[var(--text-muted)]">
                          Showing{" "}
                          {showAll
                            ? leaderboard.length
                            : Math.min(INITIAL_SHOW, leaderboard.length)}{" "}
                          of {leaderboard.length} athletes
                          {participantCounts[selected.id] != null &&
                            participantCounts[selected.id] >
                              leaderboard.length && (
                              <span>
                                {" "}
                                ({participantCounts[selected.id]} registered)
                              </span>
                            )}
                        </p>
                      </div>
                      <Card hover={false} className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr className="border-b border-[var(--border)] text-left text-xs text-[var(--text-muted)] uppercase tracking-wider">
                              <th className="py-3 px-2 w-12">#</th>
                              <th className="py-3 px-2">Athlete</th>
                              <th className="py-3 px-2 text-right">
                                Distance
                              </th>
                              <th className="py-3 px-2 text-right hidden sm:table-cell">
                                Workouts
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {(showAll
                              ? leaderboard
                              : leaderboard.slice(0, INITIAL_SHOW)
                            ).map((entry) => (
                              <tr
                                key={entry.npub}
                                className={`border-b border-[var(--border)] last:border-0 ${
                                  entry.rank <= 3
                                    ? "bg-[var(--accent)]/5"
                                    : ""
                                }`}
                              >
                                <td className="py-3 px-2">
                                  <RankBadge rank={entry.rank} />
                                </td>
                                <td className="py-3 px-2">
                                  <div className="flex items-center gap-3">
                                    <Avatar
                                      name={entry.name}
                                      picture={entry.picture}
                                    />
                                    <span
                                      className={`text-sm ${
                                        entry.rank <= 3
                                          ? "text-[var(--foreground)] font-medium"
                                          : "text-[var(--text-secondary)]"
                                      }`}
                                    >
                                      {entry.name}
                                    </span>
                                  </div>
                                </td>
                                <td className="py-3 px-2 text-right">
                                  <span
                                    className={`text-sm font-medium ${
                                      entry.rank <= 3
                                        ? "text-[var(--accent)]"
                                        : "text-[var(--foreground)]"
                                    }`}
                                  >
                                    {formatKm(entry.score)}
                                  </span>
                                </td>
                                <td className="py-3 px-2 text-right hidden sm:table-cell">
                                  <span className="text-sm text-[var(--text-muted)]">
                                    {entry.workoutCount}
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>

                        {/* Show More / Show Less */}
                        {leaderboard.length > INITIAL_SHOW && (
                          <div className="border-t border-[var(--border)] pt-4 mt-2 text-center">
                            <button
                              onClick={() => setShowAll(!showAll)}
                              className="px-6 py-2 text-sm font-medium text-[var(--accent)] border border-[var(--accent)]/30 rounded-lg hover:bg-[var(--accent)]/10 transition-colors"
                            >
                              {showAll
                                ? "Show Top 21"
                                : `Show All ${leaderboard.length} Athletes`}
                            </button>
                          </div>
                        )}
                      </Card>
                    </>
                  )}
                </div>
              )}

              {/* ---- Daily Records View ---- */}
              {view === "daily" && (
                <div>
                  <Card hover={false} className="mb-6">
                    <h2 className="text-xl font-bold text-[var(--foreground)] mb-1">
                      Daily Records
                    </h2>
                    <p className="text-sm text-[var(--text-secondary)]">
                      Today&apos;s best performances across all athletes —{" "}
                      {new Date().toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "long",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </Card>

                  {dailyLoading ? (
                    <div className="flex justify-center py-12">
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
                </div>
              )}

            </>
          )}
        </Container>
      </main>
      <Footer />
    </>
  );
}

"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Container, Card, Button } from "@/components/ui";
import { DC_5K_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";

interface Competition {
  id: string;
  external_id: string;
  name: string;
  activity_type: string;
  start_date: string;
  end_date: string;
  prize_pool_sats: number;
}

// Hide the umbrella "season-ii" entry (sub-competitions cover it)
const HIDDEN_IDS = new Set(["season-ii"]);

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

export function Events() {
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await supabase
          .from("competitions")
          .select(
            "id, external_id, name, activity_type, start_date, end_date, prize_pool_sats",
          )
          .order("start_date", { ascending: false });

        const comps: Competition[] = (data || []).filter(
          (c: Competition) => !HIDDEN_IDS.has(c.external_id),
        );
        setCompetitions(comps);

        // Fetch participant counts
        const cnts: Record<string, number> = {};
        await Promise.all(
          comps.map(async (c) => {
            const { count } = await supabase
              .from("competition_participants")
              .select("*", { count: "exact", head: true })
              .eq("competition_id", c.id);
            cnts[c.id] = count ?? 0;
          }),
        );
        setCounts(cnts);
      } catch {
        // Fail silently — show the static DC 5K event at minimum
      } finally {
        setLoaded(true);
      }
    })();
  }, []);

  const active = competitions.filter(isActive);
  const completed = competitions.filter((c) => !isActive(c));

  return (
    <section id="events" className="py-20">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            <span className="text-[var(--foreground)]">Upcoming </span>
            <span className="text-[var(--accent)]">Events</span>
          </h2>
          <p className="text-[var(--text-secondary)] max-w-2xl mx-auto">
            Join our fitness events: virtual challenges you can do anywhere, or
            in-person races to meet the community.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Featured Event: DC 5k */}
          <Card className="relative overflow-hidden border-2 border-[var(--accent)]/30 lg:col-span-2">
            <div className="absolute top-4 right-4">
              <span className="px-3 py-1 bg-[var(--accent)] text-black text-xs font-bold rounded-full uppercase">
                Featured
              </span>
            </div>

            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-shrink-0 flex items-center justify-center w-full md:w-48 h-48 bg-gradient-to-br from-[var(--accent)]/20 to-[var(--accent)]/5 rounded-lg">
                <div className="text-center">
                  <div className="text-5xl font-black text-[var(--accent)]">
                    5K
                  </div>
                  <div className="text-sm text-[var(--text-secondary)] mt-1">
                    In-Person Race
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <h3 className="text-2xl font-bold text-[var(--foreground)] mb-2">
                  RUNSTR 5K
                </h3>
                <div className="flex flex-wrap gap-4 mb-4 text-sm">
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <svg
                      className="w-4 h-4 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    March 15, 2025
                  </div>
                  <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                    <svg
                      className="w-4 h-4 text-[var(--accent)]"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Haines Point, Washington DC
                  </div>
                </div>

                <p className="text-[var(--text-secondary)] mb-6">
                  Our inaugural in-person 5K race at the scenic Haines Point
                  loop. Join runners from around the DC area for a flat, fast
                  course with views of the Potomac.
                </p>

                <Button href={DC_5K_URL} external size="lg">
                  Register Now
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </Button>
              </div>
            </div>
          </Card>

          {/* Virtual Challenges — fetched from Supabase */}
          <div className="lg:col-span-2">
            {/* Active Challenges */}
            {active.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                  Virtual Challenges
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {active.map((comp) => (
                    <Link
                      key={comp.id}
                      href="/leaderboards"
                      className="block"
                    >
                      <Card className="relative overflow-hidden h-full">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-0.5 bg-[var(--accent)]/10 text-[var(--accent)] text-xs font-medium rounded">
                            Virtual
                          </span>
                          <div className="flex items-center gap-1.5 text-xs text-[var(--accent)]">
                            <span className="w-1.5 h-1.5 bg-[var(--accent)] rounded-full animate-pulse" />
                            Live
                          </div>
                        </div>
                        <h4 className="text-lg font-bold text-[var(--foreground)] mb-1">
                          {comp.name}
                        </h4>
                        <p className="text-[var(--text-muted)] text-xs mb-2">
                          {formatDateRange(comp.start_date, comp.end_date)}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-[var(--background)] text-[var(--text-secondary)] text-xs rounded">
                            {activityLabel(comp.activity_type)}
                          </span>
                          {counts[comp.id] != null && (
                            <span className="text-xs text-[var(--text-muted)]">
                              {counts[comp.id]} participants
                            </span>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Completed Challenges */}
            {loaded && completed.length > 0 && (
              <>
                <h3 className="text-xl font-bold text-[var(--foreground)] mb-4">
                  Completed Challenges
                </h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {completed.map((comp) => (
                    <Link
                      key={comp.id}
                      href="/leaderboards"
                      className="block"
                    >
                      <Card className="relative overflow-hidden h-full opacity-80 hover:opacity-100 transition-opacity">
                        <div className="flex items-center justify-between mb-3">
                          <span className="px-2 py-0.5 bg-[var(--text-muted)]/10 text-[var(--text-muted)] text-xs font-medium rounded">
                            Completed
                          </span>
                          <span className="text-xs text-[var(--accent)]">
                            View Results →
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-[var(--foreground)] mb-1">
                          {comp.name}
                        </h4>
                        <p className="text-[var(--text-muted)] text-xs mb-2">
                          {formatDateRange(comp.start_date, comp.end_date)}
                        </p>
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="px-2 py-0.5 bg-[var(--background)] text-[var(--text-secondary)] text-xs rounded">
                            {activityLabel(comp.activity_type)}
                          </span>
                          {counts[comp.id] != null && (
                            <span className="text-xs text-[var(--text-muted)]">
                              {counts[comp.id]} participants
                            </span>
                          )}
                        </div>
                      </Card>
                    </Link>
                  ))}
                </div>
              </>
            )}

            {/* Fallback while loading */}
            {!loaded && (
              <div className="flex justify-center py-8">
                <div className="w-6 h-6 border-2 border-[var(--accent)] border-t-transparent rounded-full animate-spin" />
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}

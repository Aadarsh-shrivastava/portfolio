import PageSection from "@/components/PageSection";
import StatRow from "@/components/activity/StatRow";
import { cn } from "@/lib/utils";
import type { Activity } from "@/lib/portfolio";

interface LeetcodePanelProps {
  leetcode?: Activity["leetcode"];
}

/** One restrained visualisation plus quiet figures — no four colour cards. */
export default function LeetcodePanel({ leetcode }: LeetcodePanelProps) {
  const bands = [
    { label: "Easy", value: leetcode?.easy, weight: "bg-white/20" },
    { label: "Medium", value: leetcode?.medium, weight: "bg-accent/45" },
    { label: "Hard", value: leetcode?.hard, weight: "bg-accent/80" },
  ];

  const total = bands.reduce((sum, band) => sum + (band.value ?? 0), 0);
  const hasData = total > 0;

  return (
    <PageSection spacing="loose" ariaLabel="Problem solving">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <p className="type-eyebrow text-text-muted">Problem solving</p>
          <h2 className="type-h2 max-w-[12ch] text-balance text-text-primary">
            Solving hard problems.
          </h2>
          <p className="type-body max-w-[36ch] text-text-secondary">
            A record of consistent practice and progress over time.
          </p>
        </div>

        <div className="flex flex-col gap-12">
          {/* Single proportional bar: fills once real counts exist. */}
          <div className="flex flex-col gap-5">
            <div className="flex h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
              {hasData &&
                bands.map((band) => (
                  <span
                    key={band.label}
                    className={cn("h-full", band.weight)}
                    style={{ width: `${((band.value ?? 0) / total) * 100}%` }}
                  />
                ))}
            </div>

            <div className="flex flex-wrap items-center gap-x-8 gap-y-3">
              {bands.map((band) => (
                <span
                  key={band.label}
                  className="type-small flex items-center gap-2 text-text-muted"
                >
                  <span
                    aria-hidden="true"
                    className={cn("h-2 w-2 rounded-full", band.weight)}
                  />
                  {band.label}
                  <span
                    className={
                      band.value ? "text-text-primary" : "text-text-disabled"
                    }
                  >
                    {band.value ?? "—"}
                  </span>
                </span>
              ))}

              {!hasData && (
                <span className="type-eyebrow ml-auto text-text-muted">
                  Not connected
                </span>
              )}
            </div>
          </div>

          <StatRow
            stats={[
              { label: "Solved", value: leetcode?.totalSolved ?? null },
              {
                label: "Current streak",
                value: leetcode?.currentStreak ?? null,
              },
              { label: "Max streak", value: leetcode?.maxStreak ?? null },
              { label: "Profile", value: leetcode?.username ?? null },
            ]}
          />
        </div>
      </div>
    </PageSection>
  );
}

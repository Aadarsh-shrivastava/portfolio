import PageSection from "@/components/PageSection";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";
import type { Activity } from "@/lib/portfolio";

interface LearningListProps {
  learning?: Activity["learning"];
}

/** Qualitative stage markers rather than percentages — nothing is gamified. */
const stages = ["Exploring", "Practising", "Going deeper", "Ongoing"];

export default function LearningList({ learning }: LearningListProps) {
  if (!learning?.length) return null;

  return (
    <PageSection spacing="loose" ariaLabel="Currently learning">
      <div className="flex flex-col gap-6">
        <p className="type-eyebrow text-text-muted">Currently learning</p>
        <h2 className="type-h2 max-w-[14ch] text-balance text-text-primary">
          Exploring what&apos;s next.
        </h2>
      </div>

      <ul className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {learning.map((item, index) => {
          const reached = item.stage ? stages.indexOf(item.stage) : -1;

          return (
            <li key={item.topic}>
              <article
                className={cn(
                  ui.card,
                  "group flex min-h-[25rem] flex-col overflow-hidden",
                )}
              >
                <div className="flex flex-col gap-3 px-6 pt-6">
                  <span className="type-eyebrow text-text-muted">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <h3 className="type-h3 text-text-primary">{item.topic}</h3>

                  <p className="type-body text-text-secondary">
                    {item.description}
                  </p>
                </div>

                {item.stage && (
                  <div className="mt-auto flex items-center gap-3 px-6 pb-7 pt-10">
                    <span aria-hidden="true" className="flex gap-1">
                      {stages.slice(0, 3).map((_, tick) => (
                        <span
                          key={tick}
                          className={cn(
                            "h-[3px] w-6 rounded-full",
                            tick <= reached
                              ? "bg-accent/60"
                              : "bg-white/[0.08]",
                          )}
                        />
                      ))}
                    </span>
                    <span className="type-eyebrow text-text-muted">
                      {item.stage}
                    </span>
                  </div>
                )}
              </article>
            </li>
          );
        })}
      </ul>
    </PageSection>
  );
}

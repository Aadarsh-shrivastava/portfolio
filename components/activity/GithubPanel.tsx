import { GitFork, Star } from "lucide-react";

import ContributionGrid from "@/components/activity/ContributionGrid";
import PageSection from "@/components/PageSection";
import StatRow from "@/components/activity/StatRow";
import TextLink from "@/components/primitives/TextLink";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";
import type { Activity, PersonalProject } from "@/lib/portfolio";

interface GithubPanelProps {
  github?: Activity["github"];
  profileUrl: string;
  /** Repositories come from existing project data, never invented. */
  repositories: PersonalProject[];
}

export default function GithubPanel({
  github,
  profileUrl,
  repositories,
}: GithubPanelProps) {
  return (
    <PageSection spacing="loose" ariaLabel="GitHub">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <p className="type-eyebrow text-text-muted">GitHub</p>
          <h2 className="type-h2 max-w-[12ch] text-balance text-text-primary">
            Building consistently.
          </h2>
          <p className="type-body max-w-[36ch] text-text-secondary">
            Open source, personal projects, and experiments.
          </p>
          <TextLink href={profileUrl} external withArrow className="mt-2">
            View profile
          </TextLink>
        </div>

        <div className="flex flex-col gap-12">
          <ContributionGrid
            placeholder={github?.placeholderContributions ?? true}
            label={github?.contributionsLabel ?? "Contribution activity"}
          />

          <StatRow
            stats={[
              {
                label: "Contributions",
                value: github?.totalContributions ?? null,
              },
              { label: "Repositories", value: repositories.length || null },
            ]}
            className="sm:grid-cols-2"
          />
        </div>
      </div>

      {repositories.length > 0 && (
        <ul className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {repositories.map((repository) => (
            <li key={repository.title}>
              <a
                href={repository.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  ui.card,
                  ui.cardPadding,
                  "group flex h-full flex-col gap-4",
                )}
              >
                <h3 className="type-body text-text-primary">
                  {repository.title}
                </h3>

                <p className="type-small line-clamp-3 text-text-secondary">
                  {repository.description}
                </p>

                <div className="mt-auto flex items-center gap-5 pt-4">
                  {repository.technologies[0] && (
                    <span className="type-small flex items-center gap-2 text-text-muted">
                      <span
                        aria-hidden="true"
                        className="h-2 w-2 rounded-full bg-accent/70"
                      />
                      {repository.technologies[0]}
                    </span>
                  )}
                  {/* Counts stay blank until the GitHub source is connected. */}
                  <span className="type-small flex items-center gap-1.5 text-text-disabled">
                    <Star aria-hidden="true" className="h-3.5 w-3.5" /> —
                  </span>
                  <span className="type-small flex items-center gap-1.5 text-text-disabled">
                    <GitFork aria-hidden="true" className="h-3.5 w-3.5" /> —
                  </span>
                </div>
              </a>
            </li>
          ))}
        </ul>
      )}
    </PageSection>
  );
}

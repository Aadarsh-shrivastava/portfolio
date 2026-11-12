import { Compass, MapPin, Radio } from "lucide-react"

import Badge from "@/components/primitives/Badge"
import Button from "@/components/primitives/Button"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import { cn } from "@/lib/utils"
import type { Experience, MediaRef, PortfolioData } from "@/lib/portfolio"

interface AboutBandProps {
  profile: PortfolioData["profile"]
  focus: string[]
  experiences: Experience[]
  skills: Array<{ name: string; category: string }>
  visual?: MediaRef
}

/** Takes the year a period starts with, e.g. "Mar 2025 - Present" -> "2025". */
function startYear(period: string) {
  return period.match(/\d{4}/)?.[0] ?? ""
}

export default function AboutBand({
  profile,
  focus,
  experiences,
  skills,
  visual,
}: AboutBandProps) {
  const facts = [
    { icon: MapPin, label: "Based in", value: profile.location },
    { icon: Compass, label: "Focus", value: focus.slice(0, 3).join(" · ") },
    { icon: Radio, label: "Currently", value: profile.company },
  ]

  return (
    <PageSection fullHeight spacing="default" ariaLabel="About">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-8">
          <p className="type-eyebrow text-text-muted">About</p>

          <h2 className="type-h2 max-w-[16ch] text-balance text-text-primary">
            A builder who cares about the details.
          </h2>

          <p className="type-body-lg max-w-[44ch] text-text-secondary">{profile.bio}</p>

          <div>
            <Button href="/about" variant="secondary">
              Read more
            </Button>
          </div>

          <Media media={visual} ratio="wide" fade="frame" frame={false} className="mt-4" />
        </div>

        <div className="flex flex-col gap-12 lg:border-l lg:border-border-subtle lg:pl-20">
          <dl className="flex flex-col gap-5">
            {facts.map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-wrap items-baseline gap-x-6 gap-y-1">
                <dt className="type-body flex min-w-[9rem] items-center gap-3 text-text-muted">
                  <Icon aria-hidden="true" className="h-4 w-4 shrink-0" strokeWidth={1.5} />
                  {label}
                </dt>
                <dd className="type-body text-text-primary">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="flex flex-col gap-6 border-t border-border-subtle pt-10">
            <p className="type-eyebrow text-text-muted">Journey</p>

            <ol className="flex flex-col">
              {experiences.map((experience, index) => {
                // Only the current role is accented; the rest stay neutral.
                const isCurrent = index === 0

                return (
                  <li key={experience.id} className="flex gap-6 pb-8 last:pb-0">
                    <span
                      className={cn(
                        "type-small w-12 shrink-0 pt-0.5",
                        isCurrent ? "text-text-secondary" : "text-text-muted"
                      )}
                    >
                      {startYear(experience.period)}
                    </span>

                    {/* Timeline rail: dot plus the connecting line to the next entry. */}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "relative w-px shrink-0",
                        isCurrent
                          ? "bg-gradient-to-b from-accent/50 to-border-subtle"
                          : "bg-border-subtle"
                      )}
                    >
                      <span
                        className={cn(
                          "absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full",
                          isCurrent ? "bg-accent" : "bg-text-muted"
                        )}
                      />
                      {isCurrent && (
                        <span className="absolute left-1/2 top-1 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent/40 blur-[3px]" />
                      )}
                    </span>

                    <div className="flex min-w-0 flex-col gap-1">
                      <h3 className="type-body text-text-primary">{experience.title}</h3>
                      <p className="type-small text-text-secondary">{experience.company}</p>
                    </div>
                  </li>
                )
              })}
            </ol>
          </div>

          <div className="flex flex-col gap-5 border-t border-border-subtle pt-10">
            <p className="type-eyebrow text-text-muted">Tech stack</p>
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 8).map((skill) => (
                <Badge key={skill.name}>{skill.name}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageSection>
  )
}

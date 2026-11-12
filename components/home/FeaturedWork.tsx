"use client"

import { useState } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"

import Badge from "@/components/primitives/Badge"
import IconButton from "@/components/primitives/IconButton"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import TextLink from "@/components/primitives/TextLink"
import { cn } from "@/lib/utils"
import { getProjectVisual } from "@/lib/project-visual"
import { getProjectSlug } from "@/lib/slug"
import type { PersonalProject } from "@/lib/portfolio"

interface FeaturedWorkProps {
  projects: PersonalProject[]
}

/**
 * One featured project at a time, switched by the numbered index row below —
 * a product showcase rather than a stack of cards.
 */
export default function FeaturedWork({ projects }: FeaturedWorkProps) {
  const [active, setActive] = useState(0)

  if (!projects.length) return null

  const project = projects[active]
  const move = (delta: number) =>
    setActive((current) => (current + delta + projects.length) % projects.length)

  return (
    <PageSection fullHeight spacing="loose" ariaLabel="Featured work">
      <h2 className="type-eyebrow text-text-muted">Featured work</h2>

      <div className="mt-16 grid items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <h3 className="type-h1 max-w-[16ch] text-balance text-text-primary">
            {project.title}
          </h3>

          <p className="type-body-lg max-w-[42ch] text-text-secondary">{project.description}</p>

          <div className="flex flex-wrap gap-2 pt-2">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech}>{tech}</Badge>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            {project.caseStudy && (
              <TextLink href={`/projects/${getProjectSlug(project)}`} withArrow>
                View case study
              </TextLink>
            )}
            {project.github && (
              <TextLink href={project.github} external withArrow>
                Source
              </TextLink>
            )}
          </div>
        </div>

        <div
          className="border-gradient border-gradient-interactive overflow-hidden rounded-lg"
        >
          <Media
            media={getProjectVisual(project)}
            ratio="video"
            fade="none"
            glow="none"
            frame={false}
            priority={active === 0}
            className="bg-surface"
          />
        </div>
      </div>

      {/* Index row: switches the project above. */}
      <div className="mt-20 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between sm:gap-12">
        <div
          role="tablist"
          aria-label="Featured projects"
          className="grid flex-1 grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4"
        >
          {projects.map((item, index) => {
            const isActive = index === active

            return (
              <button
                key={item.title}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActive(index)}
                className={cn(
                  "group flex flex-col items-start gap-2 border-t pt-4 text-left transition-standard",
                  isActive
                    ? "border-text-primary text-text-primary"
                    : "border-border-subtle text-text-muted hover:text-text-secondary"
                )}
              >
                <span className="type-eyebrow">{String(index + 1).padStart(2, "0")}</span>
                <span className="type-body truncate max-w-full">{item.title}</span>
              </button>
            )
          })}
        </div>

        {projects.length > 1 && (
          <div className="flex shrink-0 gap-3">
            <IconButton
              label="Previous project"
              variant="secondary"
              className="rounded-full"
              onClick={() => move(-1)}
            >
              <ArrowLeft aria-hidden="true" className="h-4 w-4" />
            </IconButton>
            <IconButton
              label="Next project"
              variant="secondary"
              className="rounded-full"
              onClick={() => move(1)}
            >
              <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </IconButton>
          </div>
        )}
      </div>

      <div className="mt-20 border-t border-border-subtle pt-8">
        <TextLink href="/projects" withArrow>
          All projects
        </TextLink>
      </div>
    </PageSection>
  )
}

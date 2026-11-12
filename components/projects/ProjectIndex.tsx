"use client"

import Link from "next/link"
import { useMemo, useState } from "react"

import Badge from "@/components/primitives/Badge"
import Media from "@/components/Media"
import TextLink from "@/components/primitives/TextLink"
import { cn } from "@/lib/utils"
import { getProjectSlug } from "@/lib/slug"
import { getProjectVisual } from "@/lib/project-visual"
import type { PersonalProject } from "@/lib/portfolio"

interface ProjectIndexProps {
  projects: PersonalProject[]
}

const ALL = "All projects"

/**
 * Case-study index: a category filter on the right of the header, then one
 * large row per project. Rows are divided by gradient hairlines, not cards.
 */
export default function ProjectIndex({ projects }: ProjectIndexProps) {
  const [category, setCategory] = useState(ALL)

  const categories = useMemo(() => {
    const counts = new Map<string, number>([[ALL, projects.length]])

    for (const project of projects) {
      for (const name of project.categories ?? []) {
        counts.set(name, (counts.get(name) ?? 0) + 1)
      }
    }

    return [...counts.entries()]
  }, [projects])

  const visible =
    category === ALL
      ? projects
      : projects.filter((project) => project.categories?.includes(category))

  return (
    <>
      {/* Filter row sits on its own line, clear of the hero visual. */}
      <div
        role="group"
        aria-label="Filter by category"
        className="border-top-gradient flex flex-wrap items-center gap-x-3 gap-y-2 pt-6"
      >
        {categories.map(([name, count]) => {
          const isActive = name === category

          return (
            <button
              key={name}
              type="button"
              aria-pressed={isActive}
              onClick={() => setCategory(name)}
              className={cn(
                "type-small flex items-center gap-2 rounded-sm px-3 py-2 transition-standard",
                isActive
                  ? "bg-white/[0.06] text-text-primary"
                  : "text-text-muted hover:text-text-primary"
              )}
            >
              {name}
              <span className="type-eyebrow text-text-muted">
                {String(count).padStart(2, "0")}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-16 flex flex-col">
        {visible.map((project, index) => (
          <article key={project.title} className="border-top-gradient group relative">
            <div className="grid items-center gap-10 py-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16 lg:py-24">
              <div className="flex flex-col gap-5">
                <span className="type-eyebrow text-text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h2 className="type-h2 max-w-[16ch] text-balance text-text-primary transition-standard group-hover:text-accent">
                  {/* Stretched link: the whole row is the hit area. */}
                  <Link
                    href={`/projects/${getProjectSlug(project)}`}
                    className="after:absolute after:inset-0"
                  >
                    {project.title}
                  </Link>
                </h2>

                <p className="type-body max-w-[44ch] text-text-secondary">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 pt-1">
                  {(project.categories ?? project.technologies.slice(0, 3)).map((item) => (
                    <Badge key={item}>{item}</Badge>
                  ))}
                </div>

                <span className="pt-3">
                  <TextLink href={`/projects/${getProjectSlug(project)}`} withArrow>
                    View case study
                  </TextLink>
                </span>
              </div>

              <div
                className="border-gradient border-gradient-interactive overflow-hidden rounded-lg opacity-85 transition-standard group-hover:opacity-100"
              >
                <Media
                  media={getProjectVisual(project)}
                  ratio="video"
                  fade="none"
                  glow="none"
                  frame={false}
                  className="bg-surface"
                />
              </div>
            </div>
          </article>
        ))}

        {!visible.length && (
          <p className="type-body border-top-gradient py-16 text-text-secondary">
            No case studies in this category yet.
          </p>
        )}
      </div>
    </>
  )
}

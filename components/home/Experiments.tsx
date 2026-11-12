import { ArrowUpRight } from "lucide-react"
import Link from "next/link"

import Badge from "@/components/primitives/Badge"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import TextLink from "@/components/primitives/TextLink"
import { cn } from "@/lib/utils"
import { getProjectVisual } from "@/lib/project-visual"
import { getProjectSlug, type PersonalProject } from "@/lib/portfolio"

interface ExperimentsProps {
  projects: PersonalProject[]
}

/** Smaller side projects: visual on top, then title, copy and stack. */
export default function Experiments({ projects }: ExperimentsProps) {
  if (!projects.length) return null

  const columns = projects.length >= 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"

  return (
    <PageSection fullHeight spacing="default" ariaLabel="Experiments">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-20">
        <div className="flex flex-col gap-5">
          <p className="type-eyebrow text-text-muted">Experiments</p>
          <h2 className="type-h2 max-w-[14ch] text-balance text-text-primary">
            Small ideas, bigger curiosity.
          </h2>
        </div>

        <div className="flex flex-col gap-6 lg:pt-10">
          <p className="type-body-lg max-w-[44ch] text-text-secondary">
            Side projects and explorations — places to try an idea end to end before it
            becomes part of something larger.
          </p>
          <TextLink href="/projects" withArrow>
            See all projects
          </TextLink>
        </div>
      </div>

      <div className={cn("mt-20 grid gap-6 sm:grid-cols-2", columns)}>
        {projects.map((project) => {
          const href = project.caseStudy
            ? `/projects/${getProjectSlug(project)}`
            : project.github

          const body = (
            <>
              <Media media={getProjectVisual(project)} ratio="video" frame={false} />

              <div className="flex flex-1 flex-col gap-4 px-6 pb-7">
                <h3 className="type-h3 text-text-primary pt-4">{project.title}</h3>
                <p className="type-body line-clamp-3 text-text-secondary">
                  {project.description}
                </p>

                <div className="mt-auto flex items-end justify-between gap-4 pt-4">
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                      <Badge key={tech}>{tech}</Badge>
                    ))}
                  </div>
                  {href && (
                    <ArrowUpRight
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-text-muted transition-standard group-hover:text-text-primary"
                    />
                  )}
                </div>
              </div>
            </>
          )

          const shell =
            "border-gradient border-gradient-interactive group flex flex-col overflow-hidden rounded-lg transition-standard"

          if (!href) {
            return (
              <article key={project.title} className={shell}>
                {body}
              </article>
            )
          }

          return project.caseStudy ? (
            <Link key={project.title} href={href} className={shell}>
              {body}
            </Link>
          ) : (
            <a
              key={project.title}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={shell}
            >
              {body}
            </a>
          )
        })}
      </div>
    </PageSection>
  )
}

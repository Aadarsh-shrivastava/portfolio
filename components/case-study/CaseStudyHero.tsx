import Media from "@/components/Media"
import { getProjectVisual } from "@/lib/project-visual"
import { ui } from "@/styles/theme"
import type { PersonalProject } from "@/lib/portfolio"

interface CaseStudyHeroProps {
  project: PersonalProject
}

export default function CaseStudyHero({ project }: CaseStudyHeroProps) {
  const { caseStudy } = project

  return (
    <header className="flex flex-col gap-8">
      <div className="flex flex-col gap-4">
        <span className={ui.sectionLabel}>Case study</span>
        <h1 className={ui.sectionTitle}>{project.title}</h1>
        <p className="font-body text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
          {caseStudy?.tagline ?? project.description}
        </p>
      </div>

      <dl className="grid grid-cols-1 sm:grid-cols-3 gap-6 border-t border-white/10 pt-8">
        {project.role && (
          <div className="flex flex-col gap-1">
            <dt className={ui.sectionLabel}>Role</dt>
            <dd className="font-body text-sm text-white">{project.role}</dd>
          </div>
        )}
        {caseStudy?.timeline && (
          <div className="flex flex-col gap-1">
            <dt className={ui.sectionLabel}>Timeline</dt>
            <dd className="font-body text-sm text-white">{caseStudy.timeline}</dd>
          </div>
        )}
        <div className="flex flex-col gap-2">
          <dt className={ui.sectionLabel}>Stack</dt>
          <dd className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span key={tech} className={ui.chip}>
                {tech}
              </span>
            ))}
          </dd>
        </div>
      </dl>

      <Media media={getProjectVisual(project)} priority ratio="video" fade="frame" frame={false} />
    </header>
  )
}

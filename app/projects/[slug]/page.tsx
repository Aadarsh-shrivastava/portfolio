import type { Metadata } from "next"
import { notFound } from "next/navigation"

import CaseStudyGallery from "@/components/case-study/CaseStudyGallery"
import CaseStudyHero from "@/components/case-study/CaseStudyHero"
import CaseStudySection from "@/components/case-study/CaseStudySection"
import NextProject from "@/components/case-study/NextProject"
import PageSection from "@/components/PageSection"
import PageShell from "@/components/PageShell"
import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"
import {
  getCaseStudyProjects,
  getProjectBySlug,
  getProjectSlug,
  loadPortfolioData,
} from "@/lib/portfolio"

interface CaseStudyPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getCaseStudyProjects().map((project) => ({ slug: getProjectSlug(project) }))
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { seo } = loadPortfolioData()
  const project = getProjectBySlug(params.slug)

  if (!project) return {}

  return {
    title: project.title,
    description: project.caseStudy?.tagline ?? project.description,
    alternates: {
      canonical: `${seo.siteUrl}/projects/${params.slug}`,
    },
  }
}

export default function CaseStudyPage({ params }: CaseStudyPageProps) {
  const project = getProjectBySlug(params.slug)

  if (!project?.caseStudy) notFound()

  const caseStudy = project.caseStudy
  const caseStudies = getCaseStudyProjects()
  const currentIndex = caseStudies.findIndex(
    (candidate) => getProjectSlug(candidate) === params.slug
  )
  const nextProject =
    caseStudies.length > 1 ? caseStudies[(currentIndex + 1) % caseStudies.length] : undefined

  return (
    <PageShell>
      <PageSection first as="article">
        <div className="flex flex-col gap-20 sm:gap-28">
          <CaseStudyHero project={project} />

          <CaseStudySection id="overview" label="01" heading="Overview" body={caseStudy.overview} />
          <CaseStudySection id="problem" label="02" heading="Problem" body={caseStudy.problem} />
          <CaseStudySection id="approach" label="03" heading="Approach" body={caseStudy.approach} />
          <CaseStudySection id="design" label="04" heading="Design" body={caseStudy.design} />
          <CaseStudySection
            id="engineering"
            label="05"
            heading="Engineering"
            body={caseStudy.engineering}
          />

          {Boolean(caseStudy.keyDecisions?.length) && (
            <CaseStudySection id="key-decisions" label="06" heading="Key decisions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                {caseStudy.keyDecisions!.map((decision) => (
                  <div
                    key={decision.title}
                    className={cn(ui.card, ui.cardPadding, "flex flex-col gap-3")}
                  >
                    <h3 className="font-headline text-lg font-semibold text-white">
                      {decision.title}
                    </h3>
                    <p className="font-body text-sm text-on-surface-variant leading-relaxed">
                      {decision.body}
                    </p>
                  </div>
                ))}
              </div>
            </CaseStudySection>
          )}

          {Boolean(caseStudy.results?.length) && (
            <CaseStudySection id="results" label="07" heading="Results">
              <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {caseStudy.results!.map((metric) => (
                  <div
                    key={metric.label}
                    className={cn(ui.card, ui.cardPadding, "flex flex-col gap-2")}
                  >
                    <dt className={ui.sectionLabel}>{metric.label}</dt>
                    <dd className="font-headline text-2xl font-bold text-white">{metric.value}</dd>
                  </div>
                ))}
              </dl>
            </CaseStudySection>
          )}

          {Boolean(caseStudy.gallery?.length) && (
            <CaseStudySection id="gallery" label="08" heading="Gallery">
              <CaseStudyGallery items={caseStudy.gallery} />
            </CaseStudySection>
          )}

          {Boolean(caseStudy.learnings?.length) && (
            <CaseStudySection id="learnings" label="09" heading="Learnings">
              <ul className="flex flex-col gap-3 max-w-3xl">
                {caseStudy.learnings!.map((learning) => (
                  <li
                    key={learning}
                    className="font-body text-sm sm:text-base text-on-surface-variant leading-relaxed"
                  >
                    {learning}
                  </li>
                ))}
              </ul>
            </CaseStudySection>
          )}

          <NextProject project={nextProject} />
        </div>
      </PageSection>
    </PageShell>
  )
}

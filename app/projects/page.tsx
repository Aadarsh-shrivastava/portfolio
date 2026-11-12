import type { Metadata } from "next"

import PageHero from "@/components/PageHero"
import PageSection from "@/components/PageSection"
import PageShell from "@/components/PageShell"
import ProjectIndex from "@/components/projects/ProjectIndex"
import { getAsset } from "@/lib/media"
import { getCaseStudyProjects, loadPortfolioData } from "@/lib/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData()

  return {
    title: "Work",
    description: `Case studies on systems designed and built by ${seo.siteName}.`,
    alternates: {
      canonical: `${seo.siteUrl}/projects`,
    },
  }
}

export default function WorkPage() {
  const projects = getCaseStudyProjects()
  const heroVisual = getAsset("workHero", "Case study previews")

  return (
    <PageShell>
      <PageHero
        eyebrow="Work"
        title="Case studies, from idea to production."
        description="Systems I designed and built end to end. Each one goes into the problem, the decisions, and what shipping it actually taught me."
        visual={heroVisual}
      />

      <PageSection spacing="none" ariaLabel="Case studies" className="pb-[var(--section-y-lg)]">
        <ProjectIndex projects={projects} />
      </PageSection>
    </PageShell>
  )
}

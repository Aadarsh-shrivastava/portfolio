import type { Metadata } from "next"

import ExperienceSection from "@/components/ExperienceSection"
import PageShell from "@/components/PageShell"
import { loadPortfolioData } from "@/lib/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData()

  return {
    title: "Experience",
    description: `Professional experience and work history for ${seo.siteName}.`,
    alternates: {
      canonical: `${seo.siteUrl}/experience`,
    },
  }
}

export default function ExperiencePage() {
  const { experiences } = loadPortfolioData()

  return (
    <PageShell>
      <ExperienceSection experiences={experiences} standalone />
    </PageShell>
  )
}

import type { Metadata } from "next"

import PageShell from "@/components/PageShell"
import TechStackSection from "@/components/TechStackSection"
import { loadPortfolioData } from "@/lib/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData()

  return {
    title: "Tech Stack",
    description: `Technologies, languages, and tools used by ${seo.siteName}.`,
    alternates: {
      canonical: `${seo.siteUrl}/stack`,
    },
  }
}

export default function StackPage() {
  const { resumes } = loadPortfolioData()

  return (
    <PageShell>
      <TechStackSection skills={resumes[0].skills} standalone />
    </PageShell>
  )
}

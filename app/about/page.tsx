import type { Metadata } from "next"
import Link from "next/link"

import AboutIntro from "@/components/about/AboutIntro"
import Principles from "@/components/Principles"
import ExperienceSection from "@/components/ExperienceSection"
import PageSection from "@/components/PageSection"
import PageShell from "@/components/PageShell"
import TechStackSection from "@/components/TechStackSection"
import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"
import { loadPortfolioData } from "@/lib/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  const { seo, profile } = loadPortfolioData()

  return {
    title: "About",
    description: `About ${profile.name} — ${profile.title} based in ${profile.location}.`,
    alternates: {
      canonical: `${seo.siteUrl}/about`,
    },
  }
}

export default function AboutPage() {
  const { profile, about, experiences, resumes } = loadPortfolioData()

  return (
    <PageShell>
      <PageSection first>
        <AboutIntro profile={profile} story={about?.story} />
      </PageSection>

      <ExperienceSection experiences={experiences} />

      {about?.principles?.length ? (
        <PageSection ariaLabel="Principles">
          <Principles principles={about.principles} />
        </PageSection>
      ) : null}

      <TechStackSection skills={resumes[0].skills} />

      <PageSection ariaLabel="Resume and contact">
        <div className="flex flex-wrap gap-4">
          <a
            href={profile.resume}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(ui.card, ui.cardPadding, "font-body text-sm text-white hover:text-accent")}
          >
            Download resume
          </a>
          <Link
            href="/contact"
            className={cn(ui.card, ui.cardPadding, "font-body text-sm text-white hover:text-accent")}
          >
            Get in touch
          </Link>
        </div>
      </PageSection>
    </PageShell>
  )
}

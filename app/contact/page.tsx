import type { Metadata } from "next"

import ContactLinks from "@/components/contact/ContactLinks"
import PageSection from "@/components/PageSection"
import PageShell from "@/components/PageShell"
import { ui } from "@/styles/theme"
import { loadPortfolioData } from "@/lib/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  const { seo, profile } = loadPortfolioData()

  return {
    title: "Contact",
    description: `Get in touch with ${profile.name} about backend engineering and systems work.`,
    alternates: {
      canonical: `${seo.siteUrl}/contact`,
    },
  }
}

export default function ContactPage() {
  const { profile } = loadPortfolioData()

  return (
    <PageShell>
      <PageSection first id="contact">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col gap-5">
            <span className={ui.sectionLabel}>Contact</span>
            <h1 className={ui.sectionTitle}>Have a project in mind?</h1>
            <p className="font-body text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-2xl">
              Open to backend engineering roles, systems consulting, and collaborations.
              The fastest route is email.
            </p>
          </div>

          <ContactLinks profile={profile} />
        </div>
      </PageSection>
    </PageShell>
  )
}

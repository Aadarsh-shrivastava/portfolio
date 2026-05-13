import type { Metadata } from "next"

import TopNavigation from "@/components/TopNavigation"
import HeroSection from "@/components/HeroSection"
import TechStackSection from "@/components/TechStackSection"
import ExperienceSection from "@/components/ExperienceSection"
import ProjectsSection from "@/components/ProjectsSection"
import Footer from "@/components/Footer"
import { loadPortfolioData } from "@/lib/portfolio"

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData()

  return {
    title: seo.homeTitle,
    description: seo.homeDescription,
    alternates: {
      canonical: seo.homeCanonical,
    },
  }
}

export default function Portfolio() {
  const portfolioData = loadPortfolioData()
  const { profile, seo } = portfolioData

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    url: seo.siteUrl,
    image: `${seo.siteUrl}${profile.picture}`,
    jobTitle: profile.title,
    worksFor: {
      "@type": "Organization",
      name: profile.company,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: seo.locationCity,
      addressCountry: seo.locationCountryCode,
    },
    email: profile.email,
    sameAs: [profile.linkedin, profile.github],
    description: profile.bio,
    knowsAbout: seo.knowsAbout,
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.siteName,
    url: seo.siteUrl,
    about: {
      "@type": "Person",
      name: profile.name,
    },
  }

  return (
    <div className="min-h-screen bg-[#0e0e0e] text-white overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <TopNavigation
        name={profile.name}
        email={profile.email}
        resume={profile.resume}
      />

      <main className="blueprint-grid min-h-screen">
        <HeroSection profile={profile} />
        <section
          className="sr-only"
          id={`who-is-${profile.name.toLowerCase().replace(/\s+/g, "-")}`}
          aria-label={seo.whoIsHeading}
        >
          <h2>{seo.whoIsHeading}</h2>
          <p>{seo.whoIsSummary}</p>
          <p>{seo.hiringSummary}</p>
        </section>
        <ExperienceSection experiences={portfolioData.experiences} />
        <TechStackSection skills={portfolioData.resumes[0].skills} />
        <ProjectsSection projects={portfolioData.personalProjects} />
      </main>

      <Footer />
    </div>
  )
}

import type { Metadata } from "next";

import AboutBand from "@/components/home/AboutBand";
import Capabilities from "@/components/home/Capabilities";
import ContactCta from "@/components/home/ContactCta";
import Experiments from "@/components/home/Experiments";
import FeaturedWork from "@/components/home/FeaturedWork";
import Hero from "@/components/home/Hero";
import PageSection from "@/components/PageSection";
import PageShell from "@/components/PageShell";
import Principles from "@/components/Principles";
import TechStack from "@/components/home/TechStack";
import Testimonials from "@/components/home/Testimonials";
import { getAsset } from "@/lib/media";
import { getFeaturedProjects, loadPortfolioData } from "@/lib/portfolio";
import FloatingContactThread from "@/components/home/FloatingContactThread";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData();

  return {
    title: seo.homeTitle,
    description: seo.homeDescription,
    alternates: {
      canonical: seo.homeCanonical,
    },
  };
}

export default function HomePage() {
  const { profile, seo, home, about, experiences, personalProjects, resumes } =
    loadPortfolioData();
  const featuredProjects = getFeaturedProjects(2);
  const featuredTitles = new Set(
    featuredProjects.map((project) => project.title),
  );
  const experimentProjects = personalProjects.filter(
    (project) => !featuredTitles.has(project.title),
  );
  const skills = resumes[0]?.skills ?? [];
  const heroVisual = getAsset("hero", "Preview of a product interface");
  const footerVisual = getAsset("footer", "");
  const contactVisual = getAsset(
    "interactiveThread",
    "Messaging thread to start a conversation",
  );
  const aboutVisual = getAsset("about", "Workspace");
  const principlesSheet = getAsset("principles", "Abstract visual");

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
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: seo.siteName,
    url: seo.siteUrl,
    about: {
      "@type": "Person",
      name: profile.name,
    },
  };

  return (
    <PageShell footerVisual={false}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      <Hero profile={profile} visual={heroVisual} />

      {/* Plain-text summary for search engines; carries no layout. */}
      <section className="sr-only" aria-label={seo.whoIsHeading}>
        <h2>{seo.whoIsHeading}</h2>
        <p>{seo.whoIsSummary}</p>
        <p>{seo.hiringSummary}</p>
      </section>

      <Capabilities capabilities={home?.capabilities} />

      <FeaturedWork projects={featuredProjects} />

      <Experiments projects={experimentProjects} />

      <AboutBand
        profile={profile}
        focus={seo.knowsAbout}
        experiences={experiences}
        skills={skills}
        visual={aboutVisual}
      />

      {about?.principles?.length ? (
        <PageSection fullHeight spacing="default" ariaLabel="Principles">
          <Principles
            principles={about.principles}
            intro="A few beliefs that shape how I design systems and ship them."
            action={{ href: "/about", label: "Read more about my approach" }}
            visual={principlesSheet}
          />
        </PageSection>
      ) : null}

      <TechStack skills={skills} />

      <Testimonials testimonials={home?.testimonials} />

      <ContactCta profile={profile} visual={footerVisual} />

      <FloatingContactThread profile={profile} visual={contactVisual} />
    </PageShell>
  );
}

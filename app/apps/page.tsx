import type { Metadata } from "next";

import AppShowcase from "@/components/apps/AppShowcase";
import FeaturedApp from "@/components/apps/FeaturedApp";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageShell from "@/components/PageShell";
import { getAsset, getPlaceholderVisual } from "@/lib/media";
import { getApps, getFeaturedApp, loadPortfolioData } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData();

  return {
    title: "Apps",
    description: `Applications designed, built, and shipped by ${seo.siteName}.`,
    alternates: {
      canonical: `${seo.siteUrl}/apps`,
    },
  };
}

export default function AppsPage() {
  const apps = getApps();
  const featured = getFeaturedApp();
  const rest = apps.filter((app) => app.slug !== featured?.slug);
  const visual = getPlaceholderVisual("Application interface preview");
  const heroVisual = getAsset("appsHero", "Applications preview");

  return (
    <PageShell>
      <PageHero
        eyebrow="Apps"
        title="Products I've designed, built, and shipped."
        description="A collection of applications built around real problems, useful ideas, and things I wanted to exist."
        visual={heroVisual}
      />

      {/* {featured && <FeaturedApp app={featured} visual={visual} />} */}

      {rest.map((app, index) => (
        <AppShowcase
          key={app.slug}
          app={app}
          index={index + 1}
          visual={visual}
        />
      ))}

      {!apps.length && (
        <PageSection ariaLabel="Apps">
          <p className="type-body text-text-secondary">
            No applications published yet.
          </p>
        </PageSection>
      )}
    </PageShell>
  );
}

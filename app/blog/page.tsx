import type { Metadata } from "next";

import ArticleList from "@/components/blog/ArticleList";
import PageHero from "@/components/PageHero";
import PageSection from "@/components/PageSection";
import PageShell from "@/components/PageShell";
import { getAsset, getPlaceholderVisual } from "@/lib/media";
import { loadPortfolioData } from "@/lib/portfolio";

export async function generateMetadata(): Promise<Metadata> {
  const { seo } = loadPortfolioData();

  return {
    title: "Blog",
    description:
      "Notes on backend engineering, distributed systems, and building software that lasts.",
    alternates: {
      canonical: `${seo.siteUrl}/blog`,
    },
  };
}

export default function BlogPage() {
  const { blogs } = loadPortfolioData();
  const heroVisual = getAsset("blogHero", "Writing and notes");
  const rowVisual = getPlaceholderVisual("Article illustration");

  const posts = [...blogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <PageShell>
      <PageHero
        eyebrow="Blog"
        title="Thoughts on systems, products and craft."
        description="Notes, ideas, and lessons from building backend systems and the products that sit on top of them."
        visual={heroVisual}
      />

      <PageSection
        spacing="none"
        ariaLabel="Articles"
        className="pb-[var(--section-y-lg)]"
      >
        <ArticleList posts={posts} visual={rowVisual} />
      </PageSection>
    </PageShell>
  );
}

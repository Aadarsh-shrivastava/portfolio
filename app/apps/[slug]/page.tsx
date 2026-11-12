import type { Metadata } from "next"
import { notFound } from "next/navigation"

import AppCtas from "@/components/apps/AppCtas"
import AppIcon from "@/components/apps/AppIcon"
import AppMeta from "@/components/apps/AppMeta"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import PageShell from "@/components/PageShell"
import TextLink from "@/components/primitives/TextLink"
import { getPlaceholderVisual } from "@/lib/media"
import { getAppBySlug, getApps, loadPortfolioData } from "@/lib/portfolio"

interface AppPageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getApps().map((app) => ({ slug: app.slug }))
}

export async function generateMetadata({ params }: AppPageProps): Promise<Metadata> {
  const { seo } = loadPortfolioData()
  const app = getAppBySlug(params.slug)

  if (!app) return {}

  return {
    title: app.name,
    description: app.tagline,
    alternates: {
      canonical: `${seo.siteUrl}/apps/${app.slug}`,
    },
  }
}

export default function AppDetailPage({ params }: AppPageProps) {
  const app = getAppBySlug(params.slug)

  if (!app) notFound()

  const visual = getPlaceholderVisual(`${app.name} interface preview`)

  return (
    <PageShell>
      <PageSection first spacing="tight" as="article" ariaLabel={app.name}>
        <div className="flex flex-col gap-8">
          <AppIcon app={app} size="lg" />

          <h1 className="type-h1 max-w-[16ch] text-balance text-text-primary">{app.name}</h1>

          <p className="type-body-lg max-w-[46ch] text-text-secondary">{app.tagline}</p>

          <AppMeta app={app} />

          <div className="pt-2">
            <AppCtas app={app} showDetails={false} />
          </div>
        </div>

        <Media
          media={app.image ?? visual}
          ratio="wide"
          fade="frame"
          glow="default"
          frame={false}
          priority
          className="mt-16"
        />

        <div className="mt-20 max-w-[46rem] flex flex-col gap-6">
          <p className="type-body text-text-secondary">{app.description}</p>

          {app.highlights?.length ? (
            <ul className="mt-6 flex flex-col">
              {app.highlights.map((highlight) => (
                <li
                  key={highlight}
                  className="border-top-gradient type-body py-6 text-text-secondary"
                >
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-20 border-t border-border-subtle pt-8">
          <TextLink href="/apps" withArrow>
            All apps
          </TextLink>
        </div>
      </PageSection>
    </PageShell>
  )
}

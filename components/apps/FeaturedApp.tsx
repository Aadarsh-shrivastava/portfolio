import AppCtas from "@/components/apps/AppCtas"
import AppIcon from "@/components/apps/AppIcon"
import AppMeta from "@/components/apps/AppMeta"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import type { App, MediaRef } from "@/lib/portfolio"

interface FeaturedAppProps {
  app: App
  visual?: MediaRef
}

/**
 * The lead app gets a product-landing treatment: centred statement, then one
 * large cinematic visual floating out of the page.
 */
export default function FeaturedApp({ app, visual }: FeaturedAppProps) {
  return (
    <PageSection fullHeight spacing="loose" ariaLabel={app.name}>
      <div className="flex flex-col items-center gap-8 text-center">
        <AppIcon app={app} size="lg" />

        <h2 className="type-h1 max-w-[16ch] text-balance text-text-primary">{app.name}</h2>

        <p className="type-body-lg max-w-[46ch] text-balance text-text-secondary">
          {app.tagline}
        </p>

        <AppMeta app={app} />

        <div className="pt-2">
          <AppCtas app={app} />
        </div>
      </div>

      <Media
        media={app.image ?? visual}
        ratio="wide"
        fade="frame"
        glow="default"
        frame={false}
        priority
        className="mt-20"
      />

      {app.highlights?.length ? (
        <ul className="mx-auto mt-20 grid max-w-4xl gap-10 sm:grid-cols-2">
          {app.highlights.map((highlight) => (
            <li
              key={highlight}
              className="border-top-gradient type-body pt-6 text-text-secondary"
            >
              {highlight}
            </li>
          ))}
        </ul>
      ) : null}
    </PageSection>
  )
}

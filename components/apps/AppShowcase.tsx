import AppCtas from "@/components/apps/AppCtas"
import AppIcon from "@/components/apps/AppIcon"
import AppMeta from "@/components/apps/AppMeta"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import { cn } from "@/lib/utils"
import type { App, MediaRef } from "@/lib/portfolio"

interface AppShowcaseProps {
  app: App
  index: number
  visual?: MediaRef
}

/**
 * Alternating product section: text and visual swap sides each time, giving the
 * page a different rhythm from the stacked rows used on /blog and /projects.
 */
export default function AppShowcase({ app, index, visual }: AppShowcaseProps) {
  const reversed = index % 2 === 1

  return (
    <PageSection fullHeight spacing="loose" ariaLabel={app.name}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className={cn("flex flex-col gap-6", reversed && "lg:order-2")}>
          <div className="flex items-center gap-4">
            <AppIcon app={app} />
            <span className="type-eyebrow text-text-muted">
              App {String(index + 1).padStart(2, "0")}
            </span>
          </div>

          <h2 className="type-h2 max-w-[14ch] text-balance text-text-primary">{app.name}</h2>

          <p className="type-body-lg max-w-[40ch] text-text-secondary">{app.tagline}</p>

          <p className="type-body max-w-[44ch] text-text-secondary">{app.description}</p>

          <AppMeta app={app} />

          <div className="pt-2">
            <AppCtas app={app} />
          </div>
        </div>

        <Media
          media={app.image ?? visual}
          ratio="video"
          fade="frame"
          glow="subtle"
          frame={false}
          className={cn(reversed && "lg:order-1")}
        />
      </div>
    </PageSection>
  )
}

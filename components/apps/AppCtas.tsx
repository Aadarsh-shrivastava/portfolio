import Button from "@/components/primitives/Button"
import type { App } from "@/lib/portfolio"

interface AppCtasProps {
  app: App
  /** Hidden on the detail page, where "View details" is the current page. */
  showDetails?: boolean
}

/**
 * Shared store + detail actions. The Play CTA only renders when the data
 * carries a real URL — nothing is linked to a guessed store page.
 */
export default function AppCtas({ app, showDetails = true }: AppCtasProps) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {app.playUrl && (
        <Button href={app.playUrl} external variant="primary">
          Get it on Google Play
        </Button>
      )}

      {app.website && (
        <Button href={app.website} external variant="secondary">
          Visit site
        </Button>
      )}

      {showDetails && (
        <Button href={`/apps/${app.slug}`} variant={app.playUrl ? "secondary" : "primary"}>
          View product
        </Button>
      )}
    </div>
  )
}

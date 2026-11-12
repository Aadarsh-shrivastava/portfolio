import Media from "@/components/Media"
import { getAsset } from "@/lib/media"

/**
 * Wide visual band that closes every page. Rendered at the asset's own ratio
 * so nothing is cropped or scaled, pulled up into the section above, and given
 * clearance below so it does not sit flush against the footer.
 */
export default function FooterVisual() {
  const visual = getAsset("footer", "")

  if (!visual) return null

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none -mt-16 mb-16 w-full sm:-mt-24 sm:mb-24"
    >
      <Media
        media={visual}
        ratio="wide"
        fade="frame"
        frame={false}
        className="w-full opacity-60"
      />
    </div>
  )
}

import Media from "@/components/Media"
import type { MediaRef } from "@/lib/portfolio"

interface CaseStudyGalleryProps {
  items?: MediaRef[]
}

export default function CaseStudyGallery({ items }: CaseStudyGalleryProps) {
  if (!items?.length) return null

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
      {items.map((item) => (
        <Media key={item.src} media={item} />
      ))}
    </div>
  )
}

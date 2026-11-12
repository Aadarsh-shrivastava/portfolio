import Image from "next/image"

import { cn } from "@/lib/utils"
import type { MediaRef } from "@/lib/portfolio"

interface SpriteMediaProps {
  media?: MediaRef
  /** Grid the source image is divided into. */
  columns: number
  rows: number
  /** Zero-based cell to display. */
  column: number
  row: number
  /** Aspect ratio of one cell, e.g. "16 / 9". Pass "auto" to be sized by the parent. */
  cellRatio?: string
  className?: string
  priority?: boolean
}

/**
 * Shows one cell of an image sheet. The source is scaled to columns x rows of
 * the frame and offset, so a single file can supply several distinct visuals
 * without slicing it into separate assets.
 */
export default function SpriteMedia({
  media,
  columns,
  rows,
  column,
  row,
  cellRatio = "16 / 9",
  className,
  priority = false,
}: SpriteMediaProps) {
  const frame = cn("relative w-full overflow-hidden", className)

  if (!media) {
    return (
      <div
        aria-hidden="true"
        className={cn(frame, "rounded-md border border-border-subtle bg-surface")}
        style={cellRatio === "auto" ? undefined : { aspectRatio: cellRatio }}
      />
    )
  }

  return (
    <div className={frame} style={cellRatio === "auto" ? undefined : { aspectRatio: cellRatio }}>
      <div
        className="absolute"
        style={{
          width: `${columns * 100}%`,
          height: `${rows * 100}%`,
          left: `${-column * 100}%`,
          top: `${-row * 100}%`,
        }}
      >
        <Image
          src={media.src}
          alt={media.alt}
          fill
          priority={priority}
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
      </div>
    </div>
  )
}

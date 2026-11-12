import Image from "next/image"

import GradientMask from "@/components/primitives/GradientMask"
import { cn } from "@/lib/utils"
import type { MediaRef } from "@/lib/portfolio"

interface MediaProps {
  media?: MediaRef
  className?: string
  priority?: boolean
  /** Aspect ratio of the frame. Ignored when scale is "hero". */
  ratio?: "wide" | "video" | "square" | "tall"
  /** How the asset sits inside the frame. */
  fit?: "cover" | "contain"
  /** Hero-scale frame: viewport-tall box instead of a fixed aspect ratio. */
  scale?: "default" | "hero"
  /** Horizontal black fade, so large visuals emerge from the page background. */
  fade?: "none" | "soft" | "default" | "strong" | "frame" | "bottom"
  /** Ambient glow behind the frame. */
  glow?: "none" | "subtle" | "default" | "strong"
  /**
   * Border + surface + radius around the image. Turn off for visuals that
   * already sit on black and should merge into the page.
   */
  frame?: boolean
}

const ratioClass = {
  /** Matches the wide banner assets (~2.5:1). */
  wide: "aspect-[5/2]",
  video: "aspect-[16/9]",
  square: "aspect-square",
  tall: "aspect-[4/5]",
} as const

/**
 * Single place where media is rendered. Missing media falls back to a neutral
 * placeholder frame, so real assets drop in later without markup changes.
 */
export default function Media({
  media,
  className,
  priority = false,
  ratio = "video",
  fit = "cover",
  scale = "default",
  fade = "none",
  glow = "none",
  frame = true,
}: MediaProps) {
  const frameClass = cn(
    "relative w-full overflow-hidden",
    frame && "rounded-lg border border-border-subtle bg-surface",
    scale === "hero"
      ? "min-h-[min(42vh,360px)] sm:min-h-[min(46vh,420px)] lg:min-h-[min(52vh,580px)]"
      : ratioClass[ratio],
    className
  )

  const frameContent = media ? (
    <div className={frameClass}>
      <Image
        src={media.src}
        alt={media.alt}
        fill
        priority={priority}
        className={cn(
          fit === "contain" ? "object-contain object-center" : "object-cover"
        )}
        sizes="(max-width: 768px) 100vw, 60vw"
      />
    </div>
  ) : (
    <div className={cn(frameClass, !frame && "border border-border-subtle bg-surface rounded-lg")} aria-hidden="true" />
  )

  const wrapped =
    fade === "none" && glow === "none" ? (
      frameContent
    ) : (
      <GradientMask fade={fade === "none" ? "soft" : fade} glow={glow}>
        {frameContent}
      </GradientMask>
    )

  if (!media?.caption) return wrapped

  return (
    <figure className="flex flex-col gap-3">
      {wrapped}
      <figcaption className="type-eyebrow text-text-muted">{media.caption}</figcaption>
    </figure>
  )
}

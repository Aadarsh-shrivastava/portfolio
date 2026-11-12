import { cn } from "@/lib/utils"

interface GradientMaskProps {
  children: React.ReactNode
  /**
   * How far the horizontal fade reaches in from each edge.
   * "frame" also fades the bottom, for hero-scale visuals.
   */
  fade?: "soft" | "default" | "strong" | "frame" | "bottom"
  /** Adds an ambient glow behind the masked content. */
  glow?: "none" | "subtle" | "default" | "strong"
  className?: string
}

const fadeClass = {
  soft: "edge-fade-soft",
  default: "edge-fade",
  strong: "edge-fade-strong",
  frame: "edge-fade-frame",
  bottom: "edge-fade-bottom",
} as const

const glowClass = {
  none: "",
  subtle: "glow-behind glow-behind-subtle",
  default: "glow-behind",
  strong: "glow-behind glow-behind-strong",
} as const

/**
 * Reusable "emerges from darkness" wrapper: black -> content -> black.
 * Any large visual (hero, screenshot, mockup, gallery item) composes this
 * instead of reimplementing the edge fade.
 */
export default function GradientMask({
  children,
  fade = "default",
  glow = "none",
  className,
}: GradientMaskProps) {
  return (
    <div className={cn(glowClass[glow], className)}>
      <div className={fadeClass[fade]}>{children}</div>
    </div>
  )
}

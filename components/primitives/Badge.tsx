import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"

interface BadgeProps {
  children: React.ReactNode
  /** "accent" is for one-off emphasis only; the palette stays monochrome. */
  tone?: "neutral" | "accent"
  className?: string
}

export default function Badge({ children, tone = "neutral", className }: BadgeProps) {
  return (
    <span
      className={cn(
        ui.chip,
        tone === "accent" && "border-accent/25 bg-accent-subtle text-accent",
        className
      )}
    >
      {children}
    </span>
  )
}

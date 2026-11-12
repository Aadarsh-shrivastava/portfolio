import Container from "@/components/primitives/Container"
import { cn } from "@/lib/utils"

interface PageSectionProps {
  children: React.ReactNode
  /** Adds the fixed-navigation offset. Use on the first section of a page. */
  first?: boolean
  /** Vertical rhythm. Defaults to the standard section spacing. */
  spacing?: "none" | "tight" | "default" | "loose"
  /** Content measure. "full" opts out of the container for edge-to-edge visuals. */
  width?: "page" | "prose" | "full"
  /** Optional background treatment; keep this rare so black space dominates. */
  background?: "none" | "subtle" | "grid"
  /**
   * Makes the section at least one viewport tall and centres its content.
   * Used for the major sections so each one reads as its own screen.
   */
  fullHeight?: boolean
  className?: string
  id?: string
  as?: "section" | "div" | "article" | "header"
  ariaLabel?: string
}

const spacingClass = {
  none: "",
  tight: "py-[var(--section-y-tight)] lg:py-[var(--section-y-tight-lg)]",
  default: "py-[var(--section-y)] lg:py-[var(--section-y-lg)]",
  loose: "py-[var(--section-y-loose)] lg:py-[var(--section-y-loose-lg)]",
} as const

const backgroundClass = {
  none: "",
  subtle: "bg-background-subtle",
  grid: "blueprint-grid",
} as const

/**
 * The standard page section: width, gutters, vertical rhythm and optional
 * background in one place. Pages compose this instead of restating layout
 * utilities, so every section aligns to the same invisible grid.
 */
export default function PageSection({
  children,
  first = false,
  spacing = "default",
  width = "page",
  background = "none",
  fullHeight = false,
  className,
  id,
  as = "section",
  ariaLabel,
}: PageSectionProps) {
  const Tag = as

  return (
    <Tag
      id={id}
      aria-label={ariaLabel}
      className={cn(
        "relative w-full overflow-x-clip",
        spacingClass[spacing],
        backgroundClass[background],
        fullHeight && "flex min-h-svh flex-col justify-center",
        first && "pt-[calc(var(--nav-height)+var(--space-48))]",
        className
      )}
    >
      {width === "full" ? (
        children
      ) : (
        <Container width={width} className={cn(fullHeight && "w-full")}>
          {children}
        </Container>
      )}
    </Tag>
  )
}

import { cn } from "@/lib/utils"

interface ContainerProps {
  children: React.ReactNode
  /** "prose" narrows to a comfortable reading measure for long-form text. */
  width?: "page" | "prose"
  className?: string
  as?: "div" | "header" | "footer" | "nav"
}

/**
 * The one global content container: max width + responsive gutters.
 * Nothing should define its own page width.
 */
export default function Container({
  children,
  width = "page",
  className,
  as = "div",
}: ContainerProps) {
  const Tag = as

  return (
    <Tag className={cn(width === "prose" ? "container-prose" : "container-page", className)}>
      {children}
    </Tag>
  )
}

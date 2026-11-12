import Image from "next/image"

import { cn } from "@/lib/utils"
import type { App } from "@/lib/portfolio"

interface AppIconProps {
  app: App
  size?: "md" | "lg"
  className?: string
}

/**
 * App icon. Falls back to the initial on a tonal tile until a real icon exists,
 * so no placeholder artwork has to be invented.
 */
export default function AppIcon({ app, size = "md", className }: AppIconProps) {
  const dimension = size === "lg" ? "h-16 w-16" : "h-12 w-12"

  return (
    <span
      className={cn(
        "border-gradient relative flex shrink-0 items-center justify-center overflow-hidden rounded-lg bg-surface-elevated",
        dimension,
        className
      )}
    >
      {app.icon ? (
        <Image src={app.icon.src} alt={app.icon.alt} fill className="object-cover" sizes="64px" />
      ) : (
        <span aria-hidden="true" className="type-h3 text-text-muted">
          {app.name.charAt(0)}
        </span>
      )}
    </span>
  )
}

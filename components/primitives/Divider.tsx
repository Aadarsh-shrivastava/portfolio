import { cn } from "@/lib/utils"

interface DividerProps {
  /** "hairline" is a flat border; "fade" dissolves into the background at both ends. */
  variant?: "hairline" | "fade"
  className?: string
}

export default function Divider({ variant = "fade", className }: DividerProps) {
  return (
    <hr
      className={cn(
        "border-0",
        variant === "fade" ? "rule" : "h-px w-full bg-border-subtle",
        className
      )}
    />
  )
}

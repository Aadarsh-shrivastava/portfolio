import { cn } from "@/lib/utils"

export interface Stat {
  label: string
  /** null renders a dash: the figure is not available yet. */
  value: number | string | null | undefined
}

interface StatRowProps {
  stats: Stat[]
  className?: string
}

/** Figures as quiet type, not coloured stat cards. */
export default function StatRow({ stats, className }: StatRowProps) {
  return (
    <dl className={cn("grid grid-cols-2 gap-x-10 gap-y-8 sm:grid-cols-4", className)}>
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-2">
          <dt className="type-eyebrow text-text-muted">{stat.label}</dt>
          <dd
            className={cn(
              "type-h3",
              stat.value === null || stat.value === undefined
                ? "text-text-disabled"
                : "text-text-primary"
            )}
          >
            {stat.value ?? "—"}
          </dd>
        </div>
      ))}
    </dl>
  )
}

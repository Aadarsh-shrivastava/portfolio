import { cn } from "@/lib/utils"

interface ContributionGridProps {
  /** Marks the pattern as structure only, not real contribution data. */
  placeholder?: boolean
  label?: string
  weeks?: number
}

/**
 * Contribution squares in our own monochrome/indigo language rather than
 * GitHub's green. With `placeholder` the pattern is generated from a fixed
 * formula so it is stable between renders and obviously not real data.
 */
export default function ContributionGrid({
  placeholder = true,
  label = "Contribution activity",
  weeks = 26,
}: ContributionGridProps) {
  const levelClass = [
    "bg-white/[0.04]",
    "bg-white/[0.10]",
    "bg-accent/25",
    "bg-accent/45",
    "bg-accent/70",
  ]

  // Deterministic, seeded by position — never passed off as real history.
  const level = (week: number, day: number) =>
    placeholder ? (week * 7 + day * 3) % 11 === 0
      ? 4
      : (week * 5 + day) % 7 === 0
        ? 3
        : (week + day) % 5 === 0
          ? 2
          : (week * 3 + day) % 4 === 0
            ? 1
            : 0
    : 0

  return (
    <figure className="flex flex-col gap-4">
      <div
        className="flex gap-[3px] overflow-hidden"
        role="img"
        aria-label={placeholder ? `${label} — placeholder pattern` : label}
      >
        {Array.from({ length: weeks }, (_, week) => (
          <div key={week} className="flex flex-1 flex-col gap-[3px]">
            {Array.from({ length: 7 }, (_, day) => (
              <span
                key={day}
                className={cn("aspect-square w-full rounded-[2px]", levelClass[level(week, day)])}
              />
            ))}
          </div>
        ))}
      </div>

      <figcaption className="type-small flex flex-wrap items-center gap-x-4 gap-y-2 text-text-muted">
        <span>{label}</span>
        {placeholder && (
          <span className="type-eyebrow">Placeholder pattern · not connected</span>
        )}
        <span className="ml-auto flex items-center gap-2">
          Less
          {levelClass.map((tone) => (
            <span key={tone} className={cn("h-2.5 w-2.5 rounded-[2px]", tone)} />
          ))}
          More
        </span>
      </figcaption>
    </figure>
  )
}

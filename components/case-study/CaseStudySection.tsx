import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"

interface CaseStudySectionProps {
  id: string
  label?: string
  heading: string
  body?: string[]
  children?: React.ReactNode
  className?: string
}

/** Generic case-study chapter. Returns null when there is nothing to show. */
export default function CaseStudySection({
  id,
  label,
  heading,
  body,
  children,
  className,
}: CaseStudySectionProps) {
  const hasBody = Boolean(body?.length)

  if (!hasBody && !children) return null

  return (
    <section id={id} className={cn("flex flex-col gap-6", className)} aria-labelledby={`${id}-heading`}>
      <div className="flex flex-col gap-3">
        {label && <span className={ui.sectionLabel}>{label}</span>}
        <h2 id={`${id}-heading`} className="font-headline text-2xl sm:text-3xl font-bold tracking-tight text-white">
          {heading}
        </h2>
      </div>

      {hasBody && (
        <div className="flex flex-col gap-4 max-w-3xl">
          {body!.map((paragraph) => (
            <p key={paragraph} className="font-body text-on-surface-variant text-sm sm:text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}

      {children}
    </section>
  )
}

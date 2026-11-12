import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"

interface Skill {
  name: string
  category: string
}

interface TechStackSectionProps {
  skills: Skill[]
  standalone?: boolean
}

export default function TechStackSection({ skills, standalone = false }: TechStackSectionProps) {
  const groupedSkills = skills.reduce(
    (acc, skill) => {
      if (!acc[skill.category]) {
        acc[skill.category] = []
      }
      acc[skill.category].push(skill.name)
      return acc
    },
    {} as Record<string, string[]>
  )

  const categories = Object.entries(groupedSkills)

  return (
    <section
      className={cn(
        "px-4 sm:px-8 md:px-12 py-20 sm:py-32 overflow-x-clip",
        standalone && "pt-28 sm:pt-32"
      )}
      id="stack"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-6 mb-10 sm:mb-14 min-w-0">
          <h2 className={cn(ui.sectionTitle, "shrink-0")}>Tech Stack</h2>
          <div className={ui.sectionDivider} />
          <span className={cn(ui.sectionLabel, "whitespace-nowrap text-white/30")}>
            {categories.length} categories
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {categories.map(([category, items]) => (
            <div
              key={category}
              className={cn(ui.card, ui.cardPadding, "hover:border-accent/20")}
            >
              <h3 className="font-mono text-accent text-[10px] sm:text-xs uppercase tracking-[0.2em] mb-5">
                {category}
              </h3>
              <ul className="space-y-2.5">
                {items.map((item) => (
                  <li
                    key={item}
                    className="font-body text-on-surface-variant text-sm leading-snug hover:text-accent transition-colors"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

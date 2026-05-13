interface Skill {
  name: string
  category: string
}

interface TechStackSectionProps {
  skills: Skill[]
}

export default function TechStackSection({ skills }: TechStackSectionProps) {
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
    <section className="px-0 sm:px-8 md:px-12 py-20 sm:py-32 overflow-x-clip" id="stack">
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex justify-between items-baseline gap-3 mb-10 sm:mb-16 pb-6 sm:pb-8 min-w-0 px-4 sm:px-0">
          <h2 className="font-headline text-3xl sm:text-4xl font-bold tracking-tight text-white">TECHNICAL_STACK</h2>
          <span className="font-label text-[8px] sm:text-[9px] text-white/30 uppercase tracking-[0.08em] sm:tracking-[0.2em] text-right whitespace-nowrap">v2.4 // stable</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-0">
          {categories.map(([category, items], index) => (
            <div
              key={category}
              className={`p-4 sm:p-10 ${
                index === categories.length - 1 && categories.length % 2 === 1 ? "col-span-2 md:col-span-1" : ""
              } ${
                index % 2 === 0 ? "text-left pr-2 pl-4" : "text-right pl-2 pr-4"
              } md:text-left md:px-10`}
            >
              <h3 className="text-accent font-label text-[9px] sm:text-[10px] uppercase tracking-[0.08em] sm:tracking-[0.3em] mb-4 sm:mb-8 block">
                {category}
              </h3>
              <ul className="space-y-3 sm:space-y-6 font-label">
                {items.map((item) => (
                  <li key={item} className="text-white/60 text-[13px] sm:text-sm leading-snug hover:text-accent transition-colors cursor-pointer">
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

import PageSection from "@/components/PageSection"
import TextLink from "@/components/primitives/TextLink"
import { getTechLogo } from "@/lib/tech-logos"

interface Skill {
  name: string
  category: string
}

interface TechStackProps {
  skills: Skill[]
}

/** Groups the flat skill list by its category, preserving data order. */
function groupByCategory(skills: Skill[]) {
  const groups = new Map<string, string[]>()

  for (const skill of skills) {
    const existing = groups.get(skill.category)
    if (existing) existing.push(skill.name)
    else groups.set(skill.category, [skill.name])
  }

  return [...groups.entries()]
}

export default function TechStack({ skills }: TechStackProps) {
  const groups = groupByCategory(skills)

  if (!groups.length) return null

  return (
    <PageSection spacing="default" ariaLabel="Tech stack">
      <div className="grid gap-16 lg:grid-cols-[minmax(0,0.75fr)_minmax(0,1.25fr)] lg:gap-20">
        <div className="flex flex-col gap-6">
          <p className="type-eyebrow text-text-muted">Tech stack</p>
          <h2 className="type-h2 max-w-[12ch] text-balance text-text-primary">
            Tools I work with.
          </h2>
          <p className="type-body max-w-[36ch] text-text-secondary">
            The set of technologies I reach for when designing, building, and running
            production systems.
          </p>
          <TextLink href="/stack" withArrow className="mt-2">
            {`View all ${skills.length} tools`}
          </TextLink>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {groups.map(([category, names]) => (
            <section
              key={category}
              className="border-gradient flex flex-col gap-5 rounded-lg bg-surface/40 p-6"
              aria-label={category}
            >
              <h3 className="type-eyebrow text-text-muted">{category}</h3>

              <ul className="grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {names.map((name) => {
                  const logo = getTechLogo(name)

                  return (
                    <li
                      key={name}
                      className="border-gradient flex flex-col items-center gap-2.5 rounded-md bg-white/[0.02] px-2 py-4 text-center"
                    >
                      {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={logo}
                          alt=""
                          width={22}
                          height={22}
                          loading="lazy"
                          className="h-[22px] w-[22px] opacity-80"
                        />
                      ) : (
                        // No brand mark exists for this entry — use a monogram.
                        <span
                          aria-hidden="true"
                          className="type-small flex h-[22px] w-[22px] items-center justify-center rounded-[5px] bg-white/[0.06] text-text-muted"
                        >
                          {name.charAt(0)}
                        </span>
                      )}

                      <span className="type-small w-full truncate text-text-secondary">
                        {name}
                      </span>
                    </li>
                  )
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

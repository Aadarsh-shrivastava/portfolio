"use client"

import { KeyboardEvent, useState } from "react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet"

interface ExperienceProject {
  name: string
  description: string
  technologies: string[]
  impact: string
  highlights: string[]
}

interface Experience {
  id: string
  title: string
  company: string
  period: string
  location: string
  achievements: string[]
  technologies: string[]
  projects?: ExperienceProject[]
  type?: string
}

interface ExperienceSectionProps {
  experiences: Experience[]
}

function formatRange(experiences: Experience[]) {
  if (!experiences.length) return "0000-0000"
  const years = experiences
    .map((exp) => exp.period.match(/\d{4}/g))
    .flat()
    .filter(Boolean)
    .map(Number)
  if (!years.length) return "0000-0000"
  const min = Math.min(...years)
  const max = Math.max(...years)
  return `${min} - ${max}`
}

export default function ExperienceSection({ experiences }: ExperienceSectionProps) {
  const rangeText = formatRange(experiences)
  const isOddExperienceCount = experiences.length % 2 === 1
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null)
  const [isSheetOpen, setIsSheetOpen] = useState(false)
  const desktopSpanPattern = ["lg:col-span-8", "lg:col-span-4", "lg:col-span-7", "lg:col-span-5"]

  const getLevelLabel = (index: number) => {
    return `// LVL ${(experiences.length - index).toString().padStart(2, "0")}`
  }

  const openExperienceProjects = (exp: Experience) => {
    setSelectedExperience(exp)
    setIsSheetOpen(true)
  }

  const getCardInteractions = (exp: Experience) => ({
    role: "button" as const,
    tabIndex: 0,
    onClick: () => openExperienceProjects(exp),
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault()
        openExperienceProjects(exp)
      }
    },
  })

  const renderExperienceItem = (exp: Experience, index: number) => {
    const titleClass = "font-headline font-black text-white uppercase tracking-tight wrap-break-word transition-colors group-hover:text-accent"
    const metaClass = "font-label text-white/60 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] wrap-break-word transition-colors group-hover:text-accent/90"
    const periodClass = "font-label text-accent/80 text-[10px] sm:text-[11px] mb-6 sm:mb-8 block tracking-[0.2em] wrap-break-word transition-colors group-hover:text-accent-light"
    const stackChipClass = "text-[9px] sm:text-[10px] text-accent/80 border border-accent/20 px-2.5 sm:px-3 py-1 uppercase tracking-[0.15em] sm:tracking-[0.2em] break-all transition-colors group-hover:text-accent-light group-hover:border-accent/50"

    if (index === 0) {
      return (
        <div
          key={exp.id}
          {...getCardInteractions(exp)}
          className={`col-span-12 border-b border-white/5 p-5 sm:p-8 lg:p-12 relative group bg-white/1.5 hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent/30 overflow-hidden ${
            isOddExperienceCount ? "lg:col-span-12" : "lg:col-span-7 border-r"
          }`}
        >
          <div className="absolute top-0 right-0 p-3 sm:p-4 lg:p-6 font-label text-[8px] sm:text-[9px] text-accent/60 tracking-wider wrap-break-word max-w-[55%] text-right transition-colors group-hover:text-accent-light">
            {getLevelLabel(index)}
          </div>
          <span className="font-label text-accent/80 text-[10px] sm:text-[11px] mb-6 sm:mb-8 block tracking-[0.2em] wrap-break-word pr-20 transition-colors group-hover:text-accent-light">
            {exp.period}
          </span>
          <h3 className={`${titleClass} text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4`}>
            {exp.title}
          </h3>
          <div className={`${metaClass} mb-6 sm:mb-8`}>
            {exp.company}
          </div>
          <p className="font-body text-on-surface-variant leading-relaxed text-sm sm:text-base lg:text-lg font-light wrap-break-word lg:max-w-[90%]">
            {exp.achievements[0]}
          </p>
          <div className="mt-8 sm:mt-10 lg:mt-12 flex gap-2 sm:gap-3 flex-wrap">
            {exp.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className={`${stackChipClass} text-accent border-accent/15`}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )
    }

    const layoutIndex = (index - 1) % 3
    const dynamicSpan = desktopSpanPattern[(index - 1) % desktopSpanPattern.length]

    if (layoutIndex === 0) {
      return (
        <div
          key={exp.id}
          {...getCardInteractions(exp)}
          className={`col-span-12 ${dynamicSpan} border-b border-white/5 p-5 sm:p-8 lg:p-12 relative group bg-white/2 hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent/30 overflow-hidden`}
        >
          <div className="absolute top-0 right-0 p-3 sm:p-4 lg:p-6 font-label text-[8px] sm:text-[9px] text-accent/45 tracking-wider wrap-break-word max-w-[55%] text-right transition-colors group-hover:text-accent-light">
            {getLevelLabel(index)}
          </div>
          <span className={`${periodClass} pr-20`}>
            {exp.period}
          </span>
          <h3 className={`${titleClass} text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4`}>
            {exp.title}
          </h3>
          <div className={`${metaClass} mb-6 sm:mb-8`}>
            {exp.company}
          </div>
          <p className="font-body text-on-surface-variant leading-relaxed font-light text-sm sm:text-base wrap-break-word">
            {exp.achievements[0]}
          </p>
          <div className="mt-8 sm:mt-10 flex gap-2 sm:gap-3 flex-wrap">
            {exp.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className={stackChipClass}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )
    }

    if (layoutIndex === 1) {
      return (
        <div
          key={exp.id}
          {...getCardInteractions(exp)}
          className={`col-span-12 ${dynamicSpan} border-b border-white/5 p-5 sm:p-8 lg:p-12 relative group bg-white/1 hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent/30 overflow-hidden border-r`}
        >
          <div className="absolute top-0 right-0 p-3 sm:p-4 lg:p-6 font-label text-[8px] sm:text-[9px] text-accent/45 tracking-wider wrap-break-word max-w-[55%] text-right transition-colors group-hover:text-accent-light">
            {getLevelLabel(index)}
          </div>
          <span className={`${periodClass} pr-20`}>
            {exp.period}
          </span>
          <h3 className={`${titleClass} text-xl sm:text-2xl lg:text-3xl mb-3 sm:mb-4`}>
            {exp.title}
          </h3>
          <div className={`${metaClass} mb-6 sm:mb-8`}>
            {exp.company}
          </div>
          <p className="font-body text-on-surface-variant max-w-2xl leading-relaxed font-light text-sm sm:text-base wrap-break-word">
            {exp.achievements[0]}
          </p>
          <div className="mt-8 sm:mt-10 flex gap-2 sm:gap-3 flex-wrap">
            {exp.technologies.slice(0, 4).map((tech) => (
              <span key={tech} className={stackChipClass}>
                {tech}
              </span>
            ))}
          </div>
        </div>
      )
    }

    return (
      <div
        key={exp.id}
        {...getCardInteractions(exp)}
        className={`col-span-12 ${dynamicSpan} border-b border-white/5 p-5 sm:p-8 lg:p-12 relative group bg-white/ hover:bg-[#1a1a1a] transition-colors duration-300 cursor-pointer focus:outline-none focus:ring-1 focus:ring-accent/30 overflow-hidden`}
      >
        <div className="absolute top-0 right-0 p-3 sm:p-4 lg:p-6 font-label text-[8px] sm:text-[9px] text-accent/45 tracking-wider wrap-break-word max-w-[55%] text-right transition-colors group-hover:text-accent-light">
          {getLevelLabel(index)}
        </div>
        <span className={`${periodClass} pr-20`}>
          {exp.period}
        </span>
        <h3 className={`${titleClass} text-lg sm:text-xl lg:text-2xl mb-3 sm:mb-4`}>
          {exp.title}
        </h3>
        <div className={`${metaClass} mb-5 sm:mb-6`}>
          {exp.company}
        </div>
        <p className="font-body text-on-surface-variant leading-relaxed font-light text-sm sm:text-base wrap-break-word">
          {exp.achievements[0]}
        </p>
        <div className="mt-8 sm:mt-10 flex gap-2 sm:gap-3 flex-wrap">
          {exp.technologies.slice(0, 4).map((tech) => (
            <span key={tech} className={stackChipClass}>
              {tech}
            </span>
          ))}
        </div>
      </div>
    )
  }

  return (
    <section className="px-4 sm:px-6 md:px-12 py-20 sm:py-24 lg:py-32 border-t border-white/5 bg-[#0e0e0e]" id="experience">
      <div className="max-w-screen-2xl mx-auto">
        <div className="mb-12 sm:mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
          <div>
            <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-3 sm:mb-4 text-white uppercase wrap-break-word">
              System_Chronology
            </h2>
            <p className="font-label text-[9px] sm:text-[10px] text-accent tracking-[0.2em] sm:tracking-[0.3em] lg:tracking-[0.4em] uppercase wrap-break-word">
              Phase_Deployment_History // {rangeText}
            </p>
          </div>
          <div className="h-px grow bg-white/5 hidden md:block mb-3 mx-12"></div>
          <div className="font-label text-[8px] sm:text-[9px] text-white/30 tracking-[0.2em] sm:tracking-widest uppercase text-left md:text-right wrap-break-word">
            Records found: {experiences.length.toString().padStart(2, "0")}
            <br />
            Encryption: AES_256
          </div>
        </div>

        <div className="grid grid-cols-12 gap-0 border border-white/5">
          {experiences.map((exp, index) => renderExperienceItem(exp, index))}
        </div>
      </div>

      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open)
          if (!open) setSelectedExperience(null)
        }}
      >
        <SheetContent
          side="bottom"
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="h-[75vh] max-h-[75vh] border-white/10 bg-[#0e0e0e] text-white p-0 overflow-hidden"
        >
          <div className="h-full overflow-y-auto">
            <SheetHeader className="px-4 sm:px-6 md:px-12 py-5 sm:py-7 border-b border-white/10 pr-12 sm:pr-16">
              <SheetTitle className="font-headline text-xl sm:text-2xl lg:text-3xl uppercase tracking-tight text-white wrap-break-word">
                {selectedExperience?.company ?? "Projects"}
              </SheetTitle>
              <SheetDescription className="font-label text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.25em] text-white/60 wrap-break-word">
                {selectedExperience?.title} // {selectedExperience?.period}
              </SheetDescription>
            </SheetHeader>

            <div className="px-4 sm:px-6 md:px-12 py-5 sm:py-8 space-y-4 sm:space-y-6">
              {(selectedExperience?.projects?.length ?? 0) > 0 ? (
                selectedExperience?.projects?.map((project) => (
                  <div key={project.name} className="border border-white/10 p-4 sm:p-6 bg-white/2 overflow-hidden">
                    <h4 className="font-headline text-lg sm:text-xl text-white uppercase tracking-tight mb-3 wrap-break-word">
                      {project.name}
                    </h4>
                    <p className="font-body text-white/75 leading-relaxed mb-4 text-sm sm:text-base wrap-break-word">
                      {project.description}
                    </p>
                    <p className="font-body text-accent/90 text-xs sm:text-sm leading-relaxed mb-5 wrap-break-word">
                      {project.impact}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={`${project.name}-${tech}`}
                          className="text-[9px] sm:text-[10px] text-white/80 border border-white/20 px-2.5 sm:px-3 py-1 uppercase tracking-[0.12em] sm:tracking-[0.2em] break-all"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight) => (
                        <li key={highlight} className="font-body text-white/70 text-xs sm:text-sm leading-relaxed wrap-break-word">
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className="border border-white/10 p-6 bg-white/2">
                  <p className="font-body text-white/70 leading-relaxed">
                    No company projects listed for this experience yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  )
}

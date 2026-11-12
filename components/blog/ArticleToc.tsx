"use client"

import { useEffect, useState } from "react"

import { cn } from "@/lib/utils"
import type { ArticleSection } from "@/lib/portfolio"

interface ArticleTocProps {
  sections: ArticleSection[]
}

/** Sidebar contents with the current section marked as you scroll. */
export default function ArticleToc({ sections }: ArticleTocProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "")

  useEffect(() => {
    const headings = sections
      .map((section) => document.getElementById(section.id))
      .filter((element): element is HTMLElement => Boolean(element))

    if (!headings.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]

        if (visible) setActiveId(visible.target.id)
      },
      // Bias the band toward the top of the viewport, under the fixed nav.
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 }
    )

    headings.forEach((heading) => observer.observe(heading))
    return () => observer.disconnect()
  }, [sections])

  if (sections.length < 2) return null

  return (
    <nav aria-label="Table of contents">
      <ol className="flex flex-col gap-3">
        {sections.map((section) => {
          const isActive = section.id === activeId

          return (
            <li key={section.id}>
              <a
                href={`#${section.id}`}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "type-small flex items-center gap-3 transition-standard",
                  isActive ? "text-text-primary" : "text-text-muted hover:text-text-secondary"
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1.5 w-1.5 shrink-0 rounded-full transition-standard",
                    isActive ? "bg-accent" : "bg-transparent"
                  )}
                />
                {section.heading}
              </a>
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

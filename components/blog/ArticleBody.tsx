import Media from "@/components/Media"
import type { ArticleSection } from "@/lib/portfolio"

interface ArticleBodyProps {
  sections: ArticleSection[]
}

export default function ArticleBody({ sections }: ArticleBodyProps) {
  if (!sections.length) return null

  return (
    <div className="flex flex-col gap-14">
      {sections.map((section) => (
        <section key={section.id} id={section.id} className="flex flex-col gap-5" aria-labelledby={`${section.id}-heading`}>
          <h2
            id={`${section.id}-heading`}
            className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-white"
          >
            {section.heading}
          </h2>

          {section.body.map((paragraph) => (
            <p key={paragraph} className="font-body text-on-surface-variant text-sm sm:text-base leading-relaxed">
              {paragraph}
            </p>
          ))}

          {section.media?.map((media) => (
            <Media key={media.src} media={media} />
          ))}
        </section>
      ))}
    </div>
  )
}

import PageSection from "@/components/PageSection"
import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"
import type { PortfolioData } from "@/lib/portfolio"

type Testimonial = NonNullable<NonNullable<PortfolioData["home"]>["testimonials"]>[number]

interface TestimonialsProps {
  testimonials?: Testimonial[]
}

/** Renders nothing until real quotes exist — no placeholder people. */
export default function Testimonials({ testimonials }: TestimonialsProps) {
  if (!testimonials?.length) return null

  return (
    <PageSection spacing="default" ariaLabel="Testimonials">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
        <div className="flex flex-col gap-5">
          <p className="type-eyebrow text-text-muted">Testimonials</p>
          <h2 className="type-h2 max-w-[14ch] text-balance text-text-primary">
            Kind words from collaborators.
          </h2>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {testimonials.map((testimonial) => (
            <figure
              key={`${testimonial.name}-${testimonial.role}`}
              className={cn(ui.card, ui.cardPadding, "flex flex-col gap-6")}
            >
              <blockquote className="type-body text-text-secondary">
                “{testimonial.quote}”
              </blockquote>
              <figcaption className="mt-auto border-t border-border-subtle pt-5">
                <span className="type-small block text-text-primary">{testimonial.name}</span>
                <span className="type-small text-text-muted">{testimonial.role}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </PageSection>
  )
}

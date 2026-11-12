import Media from "@/components/Media";
import PageSection from "@/components/PageSection";
import type { MediaRef } from "@/lib/portfolio";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  visual?: MediaRef;
  /** Actions or links shown under the copy. */
  children?: React.ReactNode;
  /** Accessible name for the section. Defaults to the eyebrow. */
  ariaLabel?: string;
}

/**
 * The standard hero for every non-home page: copy on the left, an atmospheric
 * visual sitting against the right edge. One component so the pages cannot
 * drift apart.
 */
export default function PageHero({
  eyebrow,
  title,
  description,
  visual,
  children,
  ariaLabel,
}: PageHeroProps) {
  return (
    <PageSection
      first
      fullHeight
      spacing="tight"
      ariaLabel={ariaLabel ?? eyebrow}
      className="relative isolate"
    >
      {/* Copy and visual share a row, so the two can never overlap. The visual
          keeps its own 16:9 ratio and is pushed past the container's right
          gutter so it reads as bleeding off the page edge. */}
      <div className="flex h-full flex-col gap-14 lg:flex-row lg:items-center lg:gap-8">
        <div className="flex shrink-0 flex-col gap-6 lg:w-[38%] lg:max-w-md">
          <p className="type-eyebrow text-text-muted">{eyebrow}</p>

          <h1 className="type-h1 max-w-[16ch] text-balance text-text-primary">
            {title}
          </h1>

          {description && (
            <p className="type-body-lg max-w-[42ch] text-text-secondary">
              {description}
            </p>
          )}

          {children && <div className="pt-2">{children}</div>}
        </div>

        <div className="min-w-0 flex-1 lg:-mr-[var(--gutter-desktop)] lg:min-w-[58%]">
          <Media
            media={visual}
            fit="contain"
            scale="hero"
            fade="frame"
            glow="subtle"
            frame={false}
            priority
            className="w-full"
          />
        </div>
      </div>
    </PageSection>
  );
}

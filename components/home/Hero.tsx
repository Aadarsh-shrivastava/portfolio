import Button from "@/components/primitives/Button"
import Media from "@/components/Media"
import PageSection from "@/components/PageSection"
import TextLink from "@/components/primitives/TextLink"
import type { MediaRef, PortfolioData } from "@/lib/portfolio"

interface HeroProps {
  profile: PortfolioData["profile"]
  visual?: MediaRef
}

export default function Hero({ profile, visual }: HeroProps) {
  return (
    <PageSection fullHeight first spacing="tight" ariaLabel="Introduction">
      <div className="grid items-center gap-16 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
        <div className="flex flex-col gap-8">
          <p className="type-eyebrow text-text-muted">{profile.title}</p>

          <h1 className="type-display max-w-[14ch] text-balance text-text-primary">
            I design and build digital products.
          </h1>

          <p className="type-body-lg max-w-[46ch] text-text-secondary">{profile.bio}</p>

          <div className="flex flex-wrap items-center gap-3">
            <Button href="/projects" variant="primary">
              View my work
            </Button>
            <Button href="/about" variant="secondary">
              About me
            </Button>
          </div>

          <div className="flex flex-wrap items-center gap-6 pt-2">
            <TextLink href={profile.github} external>
              GitHub
            </TextLink>
            <TextLink href={profile.linkedin} external>
              LinkedIn
            </TextLink>
            <TextLink href={`mailto:${profile.email}`} external>
              Email
            </TextLink>
          </div>
        </div>

        {/* Large product visual: masked at the edges so it emerges from the page. */}
        <Media
          media={visual}
          ratio="video"
          fade="frame"
          glow="default"
          frame={false}
          priority
        />
      </div>
    </PageSection>
  )
}

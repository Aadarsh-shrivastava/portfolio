import PageHero from "@/components/PageHero"
import TextLink from "@/components/primitives/TextLink"
import type { MediaRef, PortfolioData } from "@/lib/portfolio"

interface ActivityHeroProps {
  profile: PortfolioData["profile"]
  visual?: MediaRef
}

export default function ActivityHero({ profile, visual }: ActivityHeroProps) {
  // Only profiles that exist in the data are rendered.
  const links = [
    { label: "GitHub", href: profile.github },
    { label: "LinkedIn", href: profile.linkedin },
    { label: "Email", href: profile.email ? `mailto:${profile.email}` : undefined },
  ].filter((link): link is { label: string; href: string } => Boolean(link.href))

  return (
    <PageHero
      eyebrow="Signals"
      title="What I'm building, learning, and exploring."
      description="A living snapshot of the things I'm working on, learning, and sharing."
      visual={visual}
      ariaLabel="Activity"
    >
      <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
        {links.map((link) => (
          <TextLink key={link.label} href={link.href} external withArrow>
            {link.label}
          </TextLink>
        ))}
      </div>
    </PageHero>
  )
}

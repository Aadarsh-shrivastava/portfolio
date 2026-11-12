import { ui } from "@/styles/theme"
import type { PortfolioData } from "@/lib/portfolio"

interface AboutIntroProps {
  profile: PortfolioData["profile"]
  story?: string[]
}

export default function AboutIntro({ profile, story }: AboutIntroProps) {
  return (
    <div className="flex flex-col gap-6">
      <span className={ui.sectionLabel}>About</span>
      <h1 className={ui.sectionTitle}>{profile.name}</h1>
      <p className="font-body text-on-surface-variant text-base sm:text-lg leading-relaxed max-w-3xl">
        {profile.bio}
      </p>

      {Boolean(story?.length) && (
        <div className="flex flex-col gap-4 max-w-3xl">
          {story!.map((paragraph) => (
            <p key={paragraph} className="font-body text-on-surface-variant text-sm sm:text-base leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

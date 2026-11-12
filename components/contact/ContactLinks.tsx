import { ArrowUpRight, FileText, Github, Linkedin, Mail } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PortfolioData } from "@/lib/portfolio"

interface ContactLinksProps {
  profile: PortfolioData["profile"]
  className?: string
}

/** Strips the protocol so the row shows a readable handle, not a full URL. */
function readable(url: string) {
  return url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")
}

export default function ContactLinks({ profile, className }: ContactLinksProps) {
  const links = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Linkedin, label: "LinkedIn", value: readable(profile.linkedin), href: profile.linkedin },
    { icon: Github, label: "GitHub", value: readable(profile.github), href: profile.github },
    { icon: FileText, label: "Resume", value: "Download PDF", href: profile.resume },
  ]

  return (
    <ul className={cn("flex flex-col divide-gradient", className)}>
      {links.map(({ icon: Icon, label, value, href }) => (
        <li key={label}>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-5 py-5 transition-standard"
          >
            <span className="border-gradient border-gradient-interactive flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-white/[0.03]">
              <Icon aria-hidden="true" className="h-4 w-4 text-text-secondary" strokeWidth={1.5} />
            </span>

            <span className="flex min-w-0 flex-col gap-0.5">
              <span className="type-body text-text-primary">{label}</span>
              <span className="type-small truncate text-text-muted">{value}</span>
            </span>

            <ArrowUpRight
              aria-hidden="true"
              className="ml-auto h-4 w-4 shrink-0 text-text-muted transition-standard group-hover:text-text-primary"
            />
          </a>
        </li>
      ))}
    </ul>
  )
}

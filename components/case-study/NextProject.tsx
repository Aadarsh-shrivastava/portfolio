import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { ui } from "@/styles/theme"
import { getProjectSlug, type PersonalProject } from "@/lib/portfolio"

interface NextProjectProps {
  project?: PersonalProject
}

export default function NextProject({ project }: NextProjectProps) {
  if (!project) return null

  return (
    <Link
      href={`/projects/${getProjectSlug(project)}`}
      className={cn(ui.card, ui.cardPadding, "group flex items-center justify-between gap-6")}
    >
      <span className="flex flex-col gap-2 min-w-0">
        <span className={ui.sectionLabel}>Next project</span>
        <span className="font-headline text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-accent transition-colors truncate">
          {project.title}
        </span>
      </span>
      <ArrowUpRight className="w-5 h-5 text-white/20 group-hover:text-accent transition-colors shrink-0" />
    </Link>
  )
}

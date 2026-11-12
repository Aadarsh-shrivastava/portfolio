"use client";

import { KeyboardEvent, useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { ui } from "@/styles/theme";

interface ExperienceProject {
  name: string;
  description: string;
  technologies: string[];
  impact: string;
  highlights: string[];
}

interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  location: string;
  achievements: string[];
  technologies: string[];
  projects?: ExperienceProject[];
  type?: string;
}

interface ExperienceSectionProps {
  experiences: Experience[];
  standalone?: boolean;
}

function formatRange(experiences: Experience[]) {
  if (!experiences.length) return "0000–0000";
  const years = experiences
    .map((exp) => exp.period.match(/\d{4}/g))
    .flat()
    .filter(Boolean)
    .map(Number);
  if (!years.length) return "0000–0000";
  const min = Math.min(...years);
  const max = Math.max(...years);
  return `${min} – ${max}`;
}

const timelineCardClass = cn(
  ui.card,
  ui.cardPadding,
  "bg-surface/50 backdrop-blur-md cursor-pointer group",
);

export default function ExperienceSection({
  experiences,
  standalone = false,
}: ExperienceSectionProps) {
  const rangeText = formatRange(experiences);
  const [selectedExperience, setSelectedExperience] =
    useState<Experience | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const openExperienceProjects = (exp: Experience) => {
    setSelectedExperience(exp);
    setIsSheetOpen(true);
  };

  const getCardInteractions = (exp: Experience) => ({
    role: "button" as const,
    tabIndex: 0,
    onClick: () => openExperienceProjects(exp),
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openExperienceProjects(exp);
      }
    },
  });

  return (
    <section
      className={cn(
        "px-4 sm:px-6 md:px-12 py-20 sm:py-24 lg:py-32 border-t border-white/10",
        standalone && "pt-28 sm:pt-32",
      )}
      id="experience"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div className="flex items-center gap-3 sm:gap-6 mb-10 sm:mb-14 min-w-0">
          <div className="shrink-0">
            <h2 className={cn(ui.sectionTitle, "wrap-break-word")}>
              Experience
            </h2>
            <p className={cn(ui.sectionLabel, "mt-2 wrap-break-word")}>
              {rangeText}
            </p>
          </div>
          <div className={cn(ui.sectionDivider, "hidden sm:block")} />
          <span
            className={cn(
              ui.sectionLabel,
              "whitespace-nowrap text-white/30 hidden sm:block",
            )}
          >
            {experiences.length} roles
          </span>
        </div>

        <div className="relative max-w-3xl">
          {/* Timeline spine */}
          <div
            className="absolute left-[7px] sm:left-[11px] top-3 bottom-3 w-px bg-white/10"
            aria-hidden
          />

          <div className="space-y-6 sm:space-y-8">
            {experiences.map((exp, index) => (
              <div
                key={exp.id}
                className="relative pl-8 sm:pl-12 group/timeline"
              >
                <div
                  className={cn(
                    "absolute left-0 top-6 sm:top-7 w-[15px] h-[15px] sm:w-[23px] sm:h-[23px] rounded-full border-2 flex items-center justify-center transition-colors",
                    index === 0
                      ? "border-accent bg-accent/20"
                      : "border-white/20 bg-background/80 group-hover/timeline:border-accent/50",
                  )}
                  aria-hidden
                >
                  <div
                    className={cn(
                      "rounded-full transition-colors",
                      index === 0
                        ? "w-2 h-2 sm:w-2.5 sm:h-2.5 bg-accent"
                        : "w-1.5 h-1.5 sm:w-2 sm:h-2 bg-white/30 group-hover/timeline:bg-accent/60",
                    )}
                  />
                </div>

                <div
                  {...getCardInteractions(exp)}
                  className={cn(timelineCardClass, "group")}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-6 mb-4">
                    <div className="min-w-0">
                      <span className="font-mono text-accent/80 text-[10px] sm:text-xs tracking-widest uppercase block mb-2">
                        {exp.period}
                      </span>
                      <h3 className="font-headline text-xl sm:text-2xl font-bold text-white tracking-tight group-hover:text-accent transition-colors wrap-break-word">
                        {exp.title}
                      </h3>
                      <p className="font-mono text-on-surface-variant text-xs sm:text-sm mt-1 wrap-break-word">
                        {exp.company}
                        {exp.location ? ` · ${exp.location}` : ""}
                      </p>
                    </div>

                    {(exp.projects?.length ?? 0) > 0 && (
                      <span className="inline-flex items-center gap-1 font-mono text-[10px] sm:text-xs text-white/30 group-hover:text-accent/80 transition-colors shrink-0">
                        {exp.projects!.length} project
                        {exp.projects!.length !== 1 ? "s" : ""}
                        <ChevronRight className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  <p className="font-body text-on-surface-variant leading-relaxed text-sm sm:text-base wrap-break-word">
                    {exp.achievements[0]}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {exp.technologies.slice(0, 5).map((tech) => (
                      <span
                        key={tech}
                        className={cn(
                          ui.chip,
                          "text-accent/80 border-accent/20 group-hover:border-accent/30",
                        )}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Sheet
        open={isSheetOpen}
        onOpenChange={(open) => {
          setIsSheetOpen(open);
          if (!open) setSelectedExperience(null);
        }}
      >
        <SheetContent
          side="bottom"
          onOpenAutoFocus={(event) => event.preventDefault()}
          className="h-[75vh] max-h-[75vh] border-white/10 bg-background/95 backdrop-blur-md text-white p-0 overflow-hidden rounded-t-xl"
        >
          <div className="h-full overflow-y-auto">
            <SheetHeader className="px-4 sm:px-6 md:px-12 py-5 sm:py-7 border-b border-white/10 pr-12 sm:pr-16">
              <SheetTitle className="font-headline text-xl sm:text-2xl lg:text-3xl tracking-tight text-white wrap-break-word">
                {selectedExperience?.company ?? "Projects"}
              </SheetTitle>
              <SheetDescription className="font-mono text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.2em] text-on-surface-variant wrap-break-word">
                {selectedExperience?.title} · {selectedExperience?.period}
              </SheetDescription>
            </SheetHeader>

            <div className="px-4 sm:px-6 md:px-12 py-5 sm:py-8 space-y-4 sm:space-y-6">
              {(selectedExperience?.projects?.length ?? 0) > 0 ? (
                selectedExperience?.projects?.map((project) => (
                  <div
                    key={project.name}
                    className={cn(
                      ui.card,
                      ui.cardPadding,
                      "bg-surface/50 overflow-hidden",
                    )}
                  >
                    <h4 className="font-headline text-lg sm:text-xl text-white font-bold tracking-tight mb-3 wrap-break-word">
                      {project.name}
                    </h4>
                    <p className="font-body text-on-surface-variant leading-relaxed mb-4 text-sm sm:text-base wrap-break-word">
                      {project.description}
                    </p>
                    <p className="font-body text-accent/90 text-xs sm:text-sm leading-relaxed mb-5 wrap-break-word">
                      {project.impact}
                    </p>
                    <div className="flex flex-wrap gap-2 mb-5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span
                          key={`${project.name}-${tech}`}
                          className={ui.chip}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <ul className="space-y-2">
                      {project.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="font-body text-on-surface-variant text-xs sm:text-sm leading-relaxed wrap-break-word"
                        >
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))
              ) : (
                <div className={cn(ui.card, ui.cardPadding, "bg-surface/50")}>
                  <p className="font-body text-on-surface-variant leading-relaxed">
                    No company projects listed for this experience yet.
                  </p>
                </div>
              )}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
}

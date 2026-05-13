interface Project {
  title: string
  description: string
  technologies: string[]
  github?: string
}

interface ProjectsSectionProps {
  projects: Project[]
}

export default function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="px-4 sm:px-8 md:px-12 py-20 sm:py-32 max-w-screen-2xl mx-auto overflow-x-clip" id="projects">
      <div className="flex items-center gap-3 sm:gap-8 mb-10 sm:mb-16 min-w-0">
        <h2 className="font-headline text-3xl sm:text-5xl font-black tracking-tight shrink-0 text-white uppercase">
          Core_Projects
        </h2>
        <div className="h-px w-full bg-white/10"></div>
        <span className="font-label text-[8px] sm:text-[9px] text-white/20 whitespace-nowrap uppercase tracking-[0.12em] sm:tracking-[0.3em]">
          Archive_v2
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
        {projects.slice(0, 4).map((project, index) => {
          const cardClass =
            "bg-[#0e0e0e] p-5 sm:p-8 md:p-12 group hover:bg-white/1 transition-colors relative overflow-hidden block"
          const inner = (
            <>
              <div className="flex justify-between items-start mb-6">
                <div className="font-label text-accent text-[8px] sm:text-[9px] tracking-[0.12em] sm:tracking-[0.35em] uppercase break-all pr-2">
                  SPEC_ID // 0x{String(index + 65).padStart(2, "0")}
                </div>
                <div className="font-label text-white/20 text-[8px] sm:text-[9px] uppercase tracking-[0.08em] sm:tracking-widest text-right break-all">
                  {project.technologies.slice(0, 2).join(" / ")}
                </div>
              </div>
              <h3 className="font-headline text-2xl sm:text-3xl font-black text-white tracking-tight leading-tight mb-4 uppercase group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="font-body text-white/50 text-sm leading-relaxed mb-8 sm:mb-10 min-h-0 line-clamp-3">
                {project.description}
              </p>
              <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-8">
                {project.technologies.slice(0, 4).map((tech) => (
                  <div key={tech} className="text-[8px] sm:text-[9px] text-white/40 uppercase tracking-[0.08em] sm:tracking-wider break-all">
                    {tech}
                  </div>
                ))}
              </div>
            </>
          )
          if (project.github) {
            return (
              <a
                key={project.title}
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className={cardClass}
              >
                {inner}
              </a>
            )
          }
          return (
            <div key={project.title} className={cardClass}>
              {inner}
            </div>
          )
        })}
      </div>
    </section>
  )
}

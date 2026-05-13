interface TopNavigationProps {
  name?: string
  email: string
  resume: string
}

export default function TopNavigation({ name, email, resume }: TopNavigationProps) {
  const displayName = (name ?? "Portfolio").split(" ")[0].toUpperCase()

  return (
    <nav className="fixed top-0 w-full z-50 bg-[#0e0e0e]/90 backdrop-blur-md border-b border-white/5 overflow-x-clip">
      <div className="flex justify-between items-center px-3 sm:px-5 md:px-12 py-4 sm:py-5 w-full max-w-screen-2xl mx-auto min-w-0 gap-2">
        <a
          href="#about"
          className="font-label font-bold text-xs sm:text-sm text-white tracking-[0.12em] sm:tracking-[0.2em] hover:text-accent transition-colors truncate min-w-0 max-w-[42vw]"
        >
          {displayName}
        </a>
        <div className="hidden md:flex gap-12">
          <a
            className="text-white/40 hover:text-white transition-colors font-label tracking-widest uppercase text-[10px]"
            href="#experience"
          >
            Exp
          </a>
          <a
            className="text-white/40 hover:text-white transition-colors font-label tracking-widest uppercase text-[10px]"
            href="#stack"
          >
            Stack
          </a>
          <a
            className="text-white/40 hover:text-white transition-colors font-label tracking-widest uppercase text-[10px]"
            href="#projects"
          >
            Projects
          </a>
        </div>
        <div className="flex items-center gap-1 sm:gap-2 shrink-0">
          <a
            href={`mailto:${email}`}
            className="font-label tracking-[0.08em] sm:tracking-widest uppercase text-[9px] sm:text-[10px] font-bold text-white/80 px-2.5 sm:px-4 py-1.5 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
          >
            Email
          </a>
          <a
            href={resume}
            target="_blank"
            rel="noopener noreferrer"
            className="font-label tracking-[0.08em] sm:tracking-widest uppercase text-[9px] sm:text-[10px] font-bold text-white/80 px-2.5 sm:px-4 py-1.5 border border-white/20 hover:bg-white hover:text-black transition-all duration-300 whitespace-nowrap"
          >
            Resume
          </a>
        </div>
      </div>
    </nav>
  )
}

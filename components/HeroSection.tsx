import { Download, Github, Linkedin, Mail } from "lucide-react"

interface HeroSectionProps {
  profile: {
    name: string
    title: string
    bio: string
    email: string
    github: string
    linkedin: string
    resume: string
    location: string
  }
}

export default function HeroSection({ profile }: HeroSectionProps) {
  const [firstName, lastName] = profile.name.split(" ")

  return (
    <section
      className="relative pt-28 sm:pt-32 pb-36 sm:pb-48 px-4 sm:px-8 md:px-12 max-w-screen-2xl mx-auto overflow-hidden"
      id="about"
    >
      <div className="grid grid-cols-12 gap-y-16 items-start relative z-10">
        {/* Main Header Group */}
        <div className="col-span-12 lg:col-span-8 flex flex-col justify-center items-center lg:items-start text-center lg:text-left">
          <div className="font-label text-accent/80 text-[9px] sm:text-[10px] tracking-[0.18em] sm:tracking-[0.35em] uppercase mb-8 sm:mb-12 flex items-center justify-center lg:justify-start gap-3 sm:gap-4">
            <span className="w-12 h-px bg-accent/30 hidden lg:block"></span>
            Structural integrity // 001
          </div>
          <h1 className="font-headline text-5xl sm:text-6xl md:text-[120px] font-black tracking-tight text-white leading-[0.9] md:leading-[0.85] mb-8 sm:mb-12">
            {firstName}
            <br />
            {lastName}
          </h1>
          <div className="max-w-2xl mx-auto lg:mx-0">
            <p className="text-white/60 text-base sm:text-lg md:text-xl font-light leading-relaxed mb-8 sm:mb-10">
              {profile.bio}
            </p>

            {/* Actions / Links */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 border-t border-white/10 pt-8">
              <a
                href={`mailto:${profile.email}`}
                className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 transition-colors group"
              >
                <Mail className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="text-[8px] text-white/50 text-center">
                  Email
                </span>
              </a>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 transition-colors group"
              >
                <Github className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="text-[8px] text-white/50 text-center">
                  GitHub
                </span>
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 transition-colors group"
              >
                <Linkedin className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="text-[8px] text-white/50 text-center">
                  LinkedIn
                </span>
              </a>
              <a
                href={profile.resume}
                download
                className="flex flex-col items-center gap-3 p-4 hover:bg-white/5 transition-colors group"
              >
                <Download className="w-5 h-5 text-accent/60 group-hover:text-accent transition-colors" />
                <span className="text-[8px] text-white/50 text-center">
                  Resume
                </span>
              </a>
            </div>
          </div>
        </div>

        {/* Profile Illustration / Grid Component */}
        <div className="col-span-12 lg:col-span-4 flex justify-center lg:justify-end items-start relative mt-12 lg:mt-0">
          <div className="relative w-full max-w-[320px] aspect-3/4 p-4 border border-white/10 subgrid">
            {/* Technical Frame Accents */}
            <div className="absolute -top-px -left-px w-8 h-8 border-t border-l border-accent"></div>
            <div className="absolute -bottom-px -right-px w-8 h-8 border-b border-r border-accent"></div>
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `repeating-linear-gradient(
                  45deg,
                  transparent,
                  transparent 2px,
                  rgba(212,175,55,0.1) 2px,
                  rgba(212,175,55,0.1) 4px
                )`,
              }}
            ></div>
            <img
              alt="Professional Headshot"
              className="w-full h-full object-cover"
              src={"/profile.webp"}
            />
            <div className="absolute -bottom-12 left-0 w-full flex justify-between items-center px-2">
              <span className="text-[8px] text-white/30 tracking-widest uppercase">
                Status_Active
              </span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-accent/60"></div>
                <div className="w-2 h-2 rounded-full bg-accent/40"></div>
                <div className="w-2 h-2 rounded-full bg-accent/20"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator Line */}
      <div className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <div className="w-px h-24 bg-linear-to-b from-white/20 via-white/10 to-transparent"></div>
        <span className="font-label text-[8px] text-white/30 uppercase tracking-[0.25em] sm:tracking-[0.5em] rotate-90 origin-center translate-y-8">
          Scroll
        </span>
      </div>
    </section>
  );
}

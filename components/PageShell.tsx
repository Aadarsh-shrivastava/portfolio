import EdgeOverlay from "@/components/primitives/EdgeOverlay"
import Footer from "@/components/Footer"
import FooterVisual from "@/components/FooterVisual"
import TopNavigation from "@/components/TopNavigation"
import { loadPortfolioData } from "@/lib/portfolio"

interface PageShellProps {
  children: React.ReactNode
  /**
   * The closing visual band. Pages that already end on a full-bleed visual
   * (the homepage contact section) opt out so it is not shown twice.
   */
  footerVisual?: boolean
}

export default function PageShell({ children, footerVisual = true }: PageShellProps) {
  const { profile } = loadPortfolioData()

  return (
    <div className="flex min-h-screen flex-col bg-background text-text-primary">
      <a
        href="#main"
        className="type-small sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:left-4 focus-visible:top-4 focus-visible:z-[60] focus-visible:rounded-sm focus-visible:bg-surface-elevated focus-visible:px-4 focus-visible:py-2 focus-visible:text-text-primary"
      >
        Skip to content
      </a>
      <TopNavigation name={profile.name} email={profile.email} />
      <main id="main" className="flex-1">
        {children}
      </main>
      {footerVisual && <FooterVisual />}
      <Footer />
      <EdgeOverlay />
    </div>
  )
}

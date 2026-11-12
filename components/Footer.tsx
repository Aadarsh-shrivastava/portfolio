import Container from "@/components/primitives/Container"
import TextLink from "@/components/primitives/TextLink"
import { loadPortfolioData } from "@/lib/portfolio"

export default function Footer() {
  const { profile } = loadPortfolioData()

  const links = [
    { label: "GitHub", href: profile.github, external: true },
    { label: "LinkedIn", href: profile.linkedin, external: true },
    { label: "Email", href: `mailto:${profile.email}`, external: true },
    { label: "Contact", href: "/contact", external: false },
  ]

  return (
    <footer className="w-full border-t border-border-subtle">
      <Container className="flex flex-col items-center justify-between gap-8 py-[var(--space-48)] md:flex-row">
        <p className="type-small order-2 text-center text-text-muted md:order-1 md:text-left">
          © {new Date().getFullYear()} {profile.name}
        </p>

        <nav aria-label="Footer" className="order-1 flex flex-wrap justify-center gap-6 md:order-2">
          {links.map((link) => (
            <TextLink key={link.label} href={link.href} external={link.external}>
              {link.label}
            </TextLink>
          ))}
        </nav>
      </Container>
    </footer>
  )
}

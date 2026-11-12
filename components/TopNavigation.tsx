"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import Button from "@/components/primitives/Button"
import Container from "@/components/primitives/Container"
import { cn } from "@/lib/utils"

interface TopNavigationProps {
  name?: string
  email: string
}

const navItems = [
  { href: "/projects", label: "Work" },
  { href: "/apps", label: "Apps" },
  { href: "/activity", label: "Activity" },
  { href: "/blog", label: "Blog" },
] as const

export default function TopNavigation({ name, email }: TopNavigationProps) {
  const pathname = usePathname()
  const displayName = (name ?? "Portfolio").split(" ")[0]

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border-subtle bg-background/80 backdrop-blur-xl">
      <Container className="flex h-[var(--nav-height)] min-w-0 items-center justify-between gap-6">
        <Link
          href="/"
          className="type-nav min-w-0 max-w-[42vw] truncate font-medium text-text-primary transition-standard hover:text-accent"
        >
          {displayName}
        </Link>

        <div className="flex min-w-0 items-center gap-1 sm:gap-2">
          {navItems.map(({ href, label }) => {
            const isActive = pathname === href || pathname.startsWith(`${href}/`)
            return (
              <Link
                key={href}
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "type-nav shrink-0 whitespace-nowrap rounded-sm px-3 py-2 transition-standard",
                  isActive
                    ? "bg-white/[0.06] text-text-primary"
                    : "text-text-muted hover:text-text-primary"
                )}
              >
                {label}
              </Link>
            )
          })}
        </div>

        <Button
          href={`mailto:${email}`}
          external
          variant="secondary"
          size="sm"
          className="shrink-0"
        >
          Let&apos;s talk
        </Button>
      </Container>
    </nav>
  )
}

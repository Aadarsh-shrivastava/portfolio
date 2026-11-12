import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import { linkBase } from "@/styles/theme"

interface TextLinkProps {
  href: string
  children: React.ReactNode
  /** Appends a trailing arrow that nudges on hover. */
  withArrow?: boolean
  external?: boolean
  className?: string
}

/** Standard inline text action: "View case study →". */
export default function TextLink({
  href,
  children,
  withArrow = false,
  external = false,
  className,
}: TextLinkProps) {
  const classes = cn(linkBase, "group type-small", className)

  const content = (
    <>
      <span>{children}</span>
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="h-3.5 w-3.5 transition-standard group-hover:translate-x-0.5"
        />
      )}
    </>
  )

  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={classes}>
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  )
}

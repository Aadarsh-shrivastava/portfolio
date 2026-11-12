import Link from "next/link"

import { cn } from "@/lib/utils"
import { buttonBase, buttonSize, buttonVariant } from "@/styles/theme"

type Variant = keyof typeof buttonVariant
type Size = keyof typeof buttonSize

interface CommonProps {
  variant?: Variant
  size?: Size
  className?: string
  children: React.ReactNode
}

type ButtonProps = CommonProps & React.ButtonHTMLAttributes<HTMLButtonElement> & { href?: never }
type InternalLinkProps = CommonProps & { href: string; external?: false }
type ExternalLinkProps = CommonProps &
  React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; external: true }

type Props = ButtonProps | InternalLinkProps | ExternalLinkProps

/**
 * Single button geometry (height, padding, radius, type, transition) with three
 * intents. Renders a button, an internal Link, or an external anchor.
 */
export default function Button(props: Props) {
  const { variant = "secondary", size = "md", className, children } = props
  const classes = cn(buttonBase, buttonVariant[variant], buttonSize[size], className)

  if ("href" in props && props.href) {
    if ("external" in props && props.external) {
      const { href, variant: _v, size: _s, className: _c, children: _ch, external: _e, ...rest } =
        props
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      )
    }

    const { href } = props
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    )
  }

  const { variant: _v, size: _s, className: _c, children: _ch, ...rest } = props as ButtonProps
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  )
}

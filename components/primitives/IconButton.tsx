import { cn } from "@/lib/utils"
import { buttonBase, buttonSize, buttonVariant } from "@/styles/theme"

interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Required: icon-only controls need an accessible name. */
  label: string
  variant?: keyof typeof buttonVariant
  children: React.ReactNode
}

export default function IconButton({
  label,
  variant = "ghost",
  className,
  children,
  ...rest
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(buttonBase, buttonVariant[variant], buttonSize.icon, className)}
      {...rest}
    >
      {children}
    </button>
  )
}

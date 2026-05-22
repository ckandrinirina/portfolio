import type {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  ReactNode,
} from 'react'
import { cn } from '../../lib/utils'

type Variant = 'primary' | 'secondary' | 'ghost'

type CommonProps = {
  variant?: Variant
  className?: string
  children: ReactNode
}

type ButtonProps = CommonProps &
  (
    | ({ as?: 'button' } & ButtonHTMLAttributes<HTMLButtonElement>)
    | ({ as: 'a'; href?: string } & AnchorHTMLAttributes<HTMLAnchorElement>)
  )

const baseClasses =
  'inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2'

const variantClasses: Record<Variant, string> = {
  primary: 'bg-brand-500 text-white hover:bg-brand-600',
  secondary:
    'border border-brand-500 bg-transparent text-brand-500 hover:bg-brand-500/10',
  ghost: 'bg-transparent text-text-primary hover:bg-surface-elevated',
}

export default function Button(props: ButtonProps) {
  const { variant = 'primary', className, children, as = 'button', ...rest } =
    props
  const classes = cn(baseClasses, variantClasses[variant], className)

  if (as === 'a') {
    return (
      <a
        className={classes}
        {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}
      >
        {children}
      </a>
    )
  }

  return (
    <button
      className={classes}
      {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
    >
      {children}
    </button>
  )
}

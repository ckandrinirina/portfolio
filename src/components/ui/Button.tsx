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

/**
 * Visible focus ring layered on top of the stylesheet's `.btn` styles so the
 * control stays keyboard-accessible across themes. The `.btn` / `.btn-primary`
 * classes (01-01) own the resting and hover appearance.
 */
const focusClasses =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--bg)]'

const variantClasses: Record<Variant, string> = {
  primary: 'btn-primary',
  secondary: 'btn',
  ghost: 'btn',
}

export default function Button(props: ButtonProps) {
  const {
    variant = 'secondary',
    className,
    children,
    as = 'button',
    ...rest
  } = props
  const classes = cn(variantClasses[variant], focusClasses, className)

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

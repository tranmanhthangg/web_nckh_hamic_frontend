import { cn } from '@/lib/cn'

export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'tabActive'
  | 'tab'

export type ButtonSize = 'sm' | 'md' | 'lg'

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-brand text-white hover:bg-brand-dark shadow-xs',
  secondary: 'bg-slate-100 text-slate-800 hover:bg-slate-200',
  outline:
    'border border-slate-300 bg-white text-slate-700 hover:border-brand hover:text-brand',
  ghost: 'text-slate-700 hover:bg-hover hover:text-brand-dark',
  tabActive: 'bg-brand text-white',
  tab: 'text-slate-600 hover:bg-hover hover:text-brand',
}

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  lg: 'h-11 px-5 text-base',
}

interface ButtonClassOptions {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export function buttonClasses({
  variant = 'primary',
  size = 'md',
  className,
}: ButtonClassOptions = {}): string {
  return cn(
    'inline-flex shrink-0 items-center justify-center gap-2 rounded-btn font-semibold transition-colors',
    'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand',
    'disabled:cursor-not-allowed disabled:opacity-60',
    variantStyles[variant],
    sizeStyles[size],
    className,
  )
}

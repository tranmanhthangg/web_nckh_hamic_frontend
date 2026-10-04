import type { ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'
import { buttonClasses } from './button-variants'
import type { ButtonSize, ButtonVariant } from './button-variants'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant
  size?: ButtonSize
}

export function Button({
  variant,
  size,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(buttonClasses({ variant, size, className }))}
      {...rest}
    />
  )
}

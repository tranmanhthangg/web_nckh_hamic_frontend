import type { KeyboardEvent } from 'react'
import { Search } from 'lucide-react'
import { cn } from '@/lib/cn'
import { buttonClasses } from './button-variants'

import type { IconComponent } from '@/types'

export type SearchSize = 'sm' | 'md' | 'lg'
export type SearchShape = 'pill' | 'rounded'

const sizeStyles: Record<SearchSize, string> = {
  sm: 'h-10 pl-10 pr-4 text-sm',
  md: 'h-10 pl-10 pr-4 text-sm',
  lg: 'h-11 pl-11 pr-4 text-base',
}

const shapeStyles: Record<SearchShape, string> = {
  pill: 'rounded-full',
  rounded: 'rounded-lg',
}

interface SearchInputProps {
  placeholder: string
  /** Nhãn cho trợ năng khi không có <label> hiển thị. */
  ariaLabel: string
  /** Thuộc tính name của input, dùng khi submit qua FormData. */
  name?: string
  value?: string
  onChange?: (value: string) => void
  /** Được gọi khi người dùng nhấn Enter. */
  onSubmit?: (value: string) => void
  /** Nút submit nằm trong ô tìm kiếm (kiểu hero trang chủ). */
  submitLabel?: string
  /** Icon kèm theo nút submit, ví dụ mũi tên "→". */
  submitIcon?: IconComponent
  size?: SearchSize
  shape?: SearchShape
  className?: string
  inputClassName?: string
}

export function SearchInput({
  placeholder,
  ariaLabel,
  name,
  value,
  onChange,
  onSubmit,
  submitLabel,
  submitIcon: SubmitIcon,
  size = 'md',
  shape = 'rounded',
  className,
  inputClassName,
}: SearchInputProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && onSubmit) {
      onSubmit(event.currentTarget.value)
    }
  }

  return (
    <div className={cn('relative w-full', className)}>
      <Search
        size={18}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-slate-400"
        aria-hidden
      />
      <input
        type="search"
        name={name}
        aria-label={ariaLabel}
        placeholder={placeholder}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
        onKeyDown={handleKeyDown}
        className={cn(
          'w-full border border-slate-200 bg-white text-slate-800 shadow-xs transition',
          'placeholder:text-slate-400 focus:border-brand focus:outline-none',
          sizeStyles[size],
          shapeStyles[shape],
          submitLabel && 'pr-28',
          inputClassName,
        )}
      />
      {submitLabel ? (
        <button
          type="submit"
          className={cn(
            buttonClasses({ variant: 'primary', size: 'sm' }),
            'absolute top-1/2 right-1.5 -translate-y-1/2',
          )}
        >
          {submitLabel}
          {SubmitIcon ? <SubmitIcon size={16} aria-hidden /> : null}
        </button>
      ) : null}
    </div>
  )
}

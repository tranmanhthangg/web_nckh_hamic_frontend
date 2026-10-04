import { cn } from '@/lib/cn'

export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg'

const sizeStyles: Record<AvatarSize, string> = {
  xs: 'size-7 text-[10px]',
  sm: 'size-9 text-xs',
  md: 'size-11 text-sm',
  lg: 'size-16 text-lg',
}

interface AvatarProps {
  name: string
  size?: AvatarSize
  className?: string
}

function initialsOf(name: string): string {
  const parts = name
    .replace(/(PGS\.TS|TS\.|ThS\.|GS\.TS|PGS|GS|TS|ThS)/g, ' ')
    .trim()
    .split(/\s+/)
    .filter(Boolean)

  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
}

/**
 * Bản mẫu dùng ảnh chân dung thật; bản tái tạo dùng chữ viết tắt để không
 * đưa vào các tệp ảnh không có trong nguồn.
 */
export function Avatar({ name, size = 'md', className }: AvatarProps) {
  return (
    <span
      aria-hidden
      className={cn(
        'inline-flex shrink-0 select-none items-center justify-center rounded-full bg-slate-100 font-semibold text-brand ring-1 ring-slate-200',
        sizeStyles[size],
        className,
      )}
    >
      {initialsOf(name)}
    </span>
  )
}

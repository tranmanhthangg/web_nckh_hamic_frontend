import { useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { IconComponent } from '@/types'

interface ModalProps {
  open: boolean
  onClose: () => void
  title: string
  subtitle?: string
  icon?: IconComponent
  children: ReactNode
  size?: 'md' | 'lg'
}

/** Hộp thoại dùng chung: nền mờ, tiêu đề nền navy, đóng bằng Esc/nút X/nền. */
export function Modal({
  open,
  onClose,
  title,
  subtitle,
  icon: Icon,
  children,
  size = 'md',
}: ModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const wasOpenRef = useRef(false)

  useEffect(() => {
    if (!open) {
      wasOpenRef.current = false
      return
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', handleKeyDown)
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    if (!wasOpenRef.current) {
      wasOpenRef.current = true
      closeButtonRef.current?.focus()
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = previousOverflow
    }
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/60 p-4 py-8 sm:py-12"
      onClick={onClose}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(event) => event.stopPropagation()}
        className={cn(
          'w-full overflow-hidden rounded-xl bg-white shadow-2xl',
          size === 'lg' ? 'max-w-2xl' : 'max-w-[30rem]',
        )}
      >
        <div className="flex items-start gap-4 bg-brand-dark px-6 py-5 text-white">
          {Icon ? (
            <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-white/10">
              <Icon size={18} aria-hidden />
            </span>
          ) : null}
          <div className="min-w-0 flex-1">
            <h2 className="text-lg font-bold">{title}</h2>
            {subtitle ? (
              <p className="mt-1 text-sm text-slate-300">{subtitle}</p>
            ) : null}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Đóng hộp thoại"
            className="rounded-md p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
          >
            <X size={18} aria-hidden />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}

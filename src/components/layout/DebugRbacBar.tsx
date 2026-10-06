import {
  CircleCheck,
  Eye,
  GraduationCap,
  Shield,
  User,
} from 'lucide-react'
import { cn } from '@/lib/cn'
import { roles } from '@/data/rbac'
import type { RoleId } from '@/data/rbac'
import { useAuth } from '@/features/auth/auth-context'
import { Container } from '@/components/ui/Container'
import type { IconComponent } from '@/types'

/** Icon minh hoạ cho từng vai trò trên thanh gỡ lỗi (suy luận theo ngữ nghĩa). */
const roleIcons: Record<RoleId, IconComponent> = {
  guest: Eye,
  student: GraduationCap,
  lecturer: User,
  admin: Shield,
}

/**
 * Thanh "SWITCHMODE: ON" của bản mẫu — công cụ kiểm thử phân quyền truy cập.
 * Nằm trên cùng, không dính theo trang khi cuộn.
 */
export function DebugRbacBar() {
  const { role, setRole, debugBarVisible, hideDebugBar } = useAuth()

  if (!debugBarVisible) return null

  return (
    <div className="bg-slate-900 text-white">
      <Container className="flex flex-wrap items-center gap-x-3 gap-y-2 py-1.5">
        <span className="rounded-sm bg-amber-400 px-2 py-0.5 font-mono text-[11px] font-bold tracking-wide text-slate-900 uppercase">
          Switchmode: On
        </span>

        <span className="text-xs font-medium text-slate-300">
          Kiểm thử phân quyền truy cập khoa học (RBAC):
        </span>

        <div
          role="group"
          aria-label="Chọn vai trò kiểm thử phân quyền"
          className="ml-auto flex flex-wrap items-center gap-1"
        >
          {roles.map((item) => {
            const Icon = roleIcons[item.id]
            const isActive = item.id === role

            return (
              <button
                key={item.id}
                type="button"
                aria-pressed={isActive}
                title={item.description}
                onClick={() => setRole(item.id)}
                className={cn(
                  'inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-semibold transition-colors',
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-800 text-slate-200 hover:bg-slate-700',
                )}
              >
                <Icon size={14} aria-hidden />
                {item.label}
              </button>
            )
          })}
        </div>

        <button
          type="button"
          onClick={hideDebugBar}
          className="ml-6 inline-flex items-center gap-2 text-xs font-semibold text-emerald-400 transition-colors hover:text-emerald-300"
        >
          <CircleCheck size={14} aria-hidden />
          Đóng thanh gỡ lỗi
        </button>
      </Container>
    </div>
  )
}

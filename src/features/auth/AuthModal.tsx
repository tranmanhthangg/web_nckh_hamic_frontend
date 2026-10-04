import { useState } from 'react'
import { CircleCheck, GraduationCap, Lock, Mail, Sparkles } from 'lucide-react'
import { cn } from '@/lib/cn'
import type { RoleId } from '@/data/rbac'
import { useAuth } from '@/features/auth/auth-context'
import type { AuthModalMode } from '@/features/auth/auth-context'
import { Button } from '@/components/ui/Button'
import { Modal } from '@/components/ui/Modal'
import { TextField } from '@/components/ui/TextField'
import type { IconComponent } from '@/types'

const modalTitles: Record<AuthModalMode, string> = {
  login: 'Đăng nhập Hệ thống NCKH',
  register: 'Đăng ký Tài khoản Nghiên cứu',
}

const tabLabels: Record<AuthModalMode, string> = {
  login: 'Đăng nhập',
  register: 'Đăng ký',
}

interface AudienceOption {
  id: Extract<RoleId, 'student' | 'lecturer'>
  label: string
  icon: IconComponent
  iconClassName: string
}

const audienceOptions: AudienceOption[] = [
  {
    id: 'student',
    label: 'Sinh viên',
    icon: GraduationCap,
    iconClassName: 'text-brand',
  },
  {
    id: 'lecturer',
    label: 'Giảng viên',
    icon: Sparkles,
    iconClassName: 'text-violet-500',
  },
]

export function AuthModal() {
  const { authModal, closeAuthModal, openAuthModal, signIn } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [audience, setAudience] =
    useState<AudienceOption['id']>('student')

  const mode: AuthModalMode = authModal ?? 'login'
  const isLogin = mode === 'login'

  return (
    <Modal
      open={authModal !== null}
      onClose={closeAuthModal}
      title={modalTitles[mode]}
      subtitle="Khoa Toán - Cơ - Tin học • HUS"
    >
      <div className="flex border-b border-slate-200">
        {(Object.keys(tabLabels) as AuthModalMode[]).map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => openAuthModal(tab)}
            aria-current={mode === tab ? 'page' : undefined}
            className={cn(
              'flex-1 border-b-2 px-4 py-3 text-base font-semibold transition-colors',
              mode === tab
                ? 'border-brand text-brand'
                : 'border-transparent text-slate-600 hover:text-brand',
            )}
          >
            {tabLabels[tab]}
          </button>
        ))}
      </div>

      <form
        className="space-y-5 px-6 py-6"
        onSubmit={(event) => {
          event.preventDefault()
          signIn({
            email,
            role: isLogin ? 'student' : audience,
          })
        }}
      >
        <TextField
          label="Email hoặc Mã sinh viên / Mã cán bộ (MSV)"
          name={isLogin ? 'loginIdentifier' : 'registerIdentifier'}
          type="text"
          icon={Mail}
          required
          autoComplete="username"
          value={email}
          onChange={setEmail}
          placeholder="VD: 22001458@vnu.edu.vn hoặc MSV: 22001458"
        />

        <TextField
          label="Mật khẩu"
          name={isLogin ? 'loginPassword' : 'registerPassword'}
          type="password"
          icon={Lock}
          required
          autoComplete={isLogin ? 'current-password' : 'new-password'}
          value={password}
          onChange={setPassword}
          placeholder="Nhập mật khẩu"
        />

        {isLogin ? null : (
          <>
            <TextField
              label="Xác nhận mật khẩu"
              name="registerPasswordConfirm"
              type="password"
              icon={Lock}
              required
              autoComplete="new-password"
              value={confirmPassword}
              onChange={setConfirmPassword}
              placeholder="Nhập lại mật khẩu"
            />

            <div>
              <p className="mb-1.5 text-sm font-semibold text-slate-800">
                Đối tượng người dùng (Box đối tượng){' '}
                <span className="text-red-500">*</span>
              </p>
              <div className="grid grid-cols-2 gap-3">
                {audienceOptions.map((option) => {
                  const Icon = option.icon
                  const isActive = audience === option.id

                  return (
                    <button
                      key={option.id}
                      type="button"
                      aria-pressed={isActive}
                      onClick={() => setAudience(option.id)}
                      className={cn(
                        'flex flex-col items-center gap-2 rounded-lg border px-4 py-4 text-sm font-semibold transition-colors',
                        isActive
                          ? 'border-brand bg-blue-50 text-brand'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-brand/40',
                      )}
                    >
                      <Icon size={22} className={option.iconClassName} aria-hidden />
                      {option.label}
                    </button>
                  )
                })}
              </div>
            </div>
          </>
        )}

        <Button type="submit" size="lg" className="w-full rounded-md">
          <CircleCheck size={18} aria-hidden />
          {isLogin ? 'Đăng nhập vào hệ thống' : 'Đăng ký tài khoản'}
        </Button>

        <p className="text-center text-sm text-slate-600">
          {isLogin ? 'Chưa có tài khoản? ' : 'Đã có tài khoản? '}
          <button
            type="button"
            onClick={() => openAuthModal(isLogin ? 'register' : 'login')}
            className="font-semibold text-brand hover:underline"
          >
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </button>
        </p>
      </form>
    </Modal>
  )
}

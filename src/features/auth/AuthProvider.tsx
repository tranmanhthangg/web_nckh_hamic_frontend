import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { rolePermissions } from '@/data/rbac'
import type { RoleId } from '@/data/rbac'
import { AuthContext } from './auth-context'
import type { AuthContextValue, AuthModalMode, AuthUser } from './auth-context'

/**
 * Tài khoản mô phỏng cho từng vai trò (thanh "SWITCHMODE" đổi vai trò trực
 * tiếp, giống bản mẫu dùng để kiểm thử phân quyền).
 */
const demoAccounts: Record<RoleId, AuthUser | null> = {
  guest: null,
  student: { name: 'Sinh viên MIM', email: 'student@hus.edu.vn', role: 'student' },
  lecturer: {
    name: 'Giảng viên MIM',
    email: 'lecturer@hus.edu.vn',
    role: 'lecturer',
  },
  admin: { name: 'Quản trị viên', email: 'admin@hus.edu.vn', role: 'admin' },
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [role, setRoleState] = useState<RoleId>('guest')
  const [user, setUser] = useState<AuthUser | null>(null)
  const [authModal, setAuthModal] = useState<AuthModalMode | null>(null)
  const [debugBarVisible, setDebugBarVisible] = useState(true)

  const setRole = useCallback((next: RoleId) => {
    setRoleState(next)
    setUser(demoAccounts[next])
  }, [])

  const signIn = useCallback<AuthContextValue['signIn']>((payload) => {
    const fallbackName = payload.email.split('@')[0] || 'Người dùng MIM'
    setRoleState(payload.role)
    setUser({
      name: payload.name?.trim() || fallbackName,
      email: payload.email,
      role: payload.role,
    })
    setAuthModal(null)
  }, [])

  const signOut = useCallback(() => {
    setRoleState('guest')
    setUser(null)
  }, [])

  const openAuthModal = useCallback((mode: AuthModalMode) => {
    setAuthModal(mode)
  }, [])

  const closeAuthModal = useCallback(() => {
    setAuthModal(null)
  }, [])

  const hideDebugBar = useCallback(() => {
    setDebugBarVisible(false)
  }, [])

  const value = useMemo<AuthContextValue>(
    () => ({
      role,
      setRole,
      user,
      isAuthenticated: user !== null,
      signIn,
      signOut,
      authModal,
      openAuthModal,
      closeAuthModal,
      debugBarVisible,
      hideDebugBar,
      hasPermission: (permission: string) =>
        rolePermissions[role].includes(permission),
    }),
    [
      role,
      setRole,
      user,
      signIn,
      signOut,
      authModal,
      openAuthModal,
      closeAuthModal,
      debugBarVisible,
      hideDebugBar,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

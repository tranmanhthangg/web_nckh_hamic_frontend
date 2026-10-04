import { createContext, useContext } from 'react'
import type { RoleId } from '@/data/rbac'

export type AuthModalMode = 'login' | 'register'

export interface AuthUser {
  name: string
  email: string
  role: RoleId
}

export interface AuthContextValue {
  /** Vai trò đang hoạt động — điều khiển thanh "SWITCHMODE" và quyền truy cập. */
  role: RoleId
  setRole: (role: RoleId) => void
  user: AuthUser | null
  isAuthenticated: boolean
  signIn: (payload: { name?: string; email: string; role: RoleId }) => void
  signOut: () => void
  /** Modal đăng nhập/đăng ký đang mở (null nếu đóng). */
  authModal: AuthModalMode | null
  openAuthModal: (mode: AuthModalMode) => void
  closeAuthModal: () => void
  debugBarVisible: boolean
  hideDebugBar: () => void
  hasPermission: (permission: string) => boolean
}

export const AuthContext = createContext<AuthContextValue | null>(null)

export function useAuth(): AuthContextValue {
  const value = useContext(AuthContext)
  if (!value) {
    throw new Error('useAuth phải được dùng bên trong <AuthProvider>.')
  }
  return value
}

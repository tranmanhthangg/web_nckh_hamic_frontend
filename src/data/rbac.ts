/**
 * Trạng thái đăng nhập + phân quyền (RBAC) dùng cho thanh "SWITCHMODE" và
 * khu vực tài khoản trên header.
 *
 * Bốn vai trò quan sát được nguyên văn trên thanh gỡ lỗi của bản mẫu.
 */
export type RoleId = 'guest' | 'student' | 'lecturer' | 'admin'

export interface Role {
  id: RoleId
  label: string
  description: string
}

export const roles: Role[] = [
  {
    id: 'guest',
    label: 'Khách (Guest)',
    description: 'Xem công khai, không truy cập toàn văn hạn chế.',
  },
  {
    id: 'student',
    label: 'Sinh viên (Student)',
    description: 'Tải toàn văn khóa luận, đăng ký đề tài và theo dõi mentor.',
  },
  {
    id: 'lecturer',
    label: 'Giảng viên (Lecturer)',
    description: 'Quản lý công trình, phản biện và nhận hướng dẫn sinh viên.',
  },
  {
    id: 'admin',
    label: 'Quản trị viên (Admin)',
    description: 'Toàn quyền cấu hình hệ thống, tài khoản và học liệu.',
  },
]

/** Quyền truy cập theo vai trò (dùng cho lớp phủ bảo vệ nội dung). */
export const rolePermissions: Record<RoleId, string[]> = {
  guest: ['public:read'],
  student: ['public:read', 'fulltext:read', 'topic:register', 'mentor:follow'],
  lecturer: [
    'public:read',
    'fulltext:read',
    'mentor:follow',
    'publication:manage',
    'mentor:accept',
  ],
  admin: [
    'public:read',
    'fulltext:read',
    'fulltext:manage',
    'topic:register',
    'mentor:follow',
    'publication:manage',
    'mentor:accept',
    'system:configure',
  ],
}

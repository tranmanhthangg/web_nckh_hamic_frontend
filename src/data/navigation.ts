import {
  Building2,
  CircleUser,
  Compass,
  GraduationCap,
  Layers,
} from 'lucide-react'
import type { IconComponent } from '@/types'

/** 5 mục điều hướng chính — quan sát được trên thanh nav của mọi trang. */
export type NavPath = '/' | '/tim-kiem' | '/tru-cot' | '/giang-vien' | '/lab'

export interface NavItem {
  path: NavPath
  label: string
  icon: IconComponent
}

export const navItems: NavItem[] = [
  { path: '/', label: 'Trang chủ', icon: Building2 },
  { path: '/tim-kiem', label: 'Bản đồ Tri thức & Tìm kiếm', icon: Compass },
  { path: '/tru-cot', label: '5 Trụ cột Nghiên cứu', icon: Layers },
  { path: '/giang-vien', label: 'Giảng viên & Mentors', icon: GraduationCap },
  { path: '/lab', label: 'Phòng thí nghiệm / Lab', icon: CircleUser },
]

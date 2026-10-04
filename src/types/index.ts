import type { ComponentType } from 'react'

/** Kiểu icon dùng chung cho các component (tương thích lucide-react). */
export type IconComponent = ComponentType<{
  size?: number | string
  className?: string
  strokeWidth?: number | string
  'aria-hidden'?: boolean
}>

export type DomainCode = 'MATH' | 'MECH' | 'CS' | 'DS-AI' | 'OPT'

export interface Domain {
  code: DomainCode
  /** Tên ngắn hiển thị trên thẻ trụ cột ở Trang chủ. */
  name: string
  /** Tên đầy đủ dùng ở trang "5 Trụ cột Nghiên cứu" và footer. */
  fullName: string
  /** Số liệu trên thẻ trụ cột Trang chủ — dạng "27 bài • 2 GV". */
  homeDocuments: number
  homeLecturers: number
  /** Số liệu trên trang "5 Trụ cột" — "25 công trình • 6 giảng viên • 1 phòng lab". */
  documents: number
  lecturers: number
  labs: number
  /** Mô tả dài — chỉ có trên trang "5 Trụ cột Nghiên cứu". */
  description?: string
  hotTopics: string[]
  trainingPaths: string[]
}

export type PublicationKind =
  | 'project'
  | 'international'
  | 'master'
  | 'bachelor'

export interface Publication {
  id: string
  kind: PublicationKind
  year: number
  title: string
  domainCode: DomainCode
  domainLabel: string
  major: string
  author: { name: string; cohort: string }
  advisor: { title: string; name: string }
  views: number
  downloads: number
  doi?: string
}

export type MentorAudience = 'student' | 'master' | 'phd'

export interface Mentor {
  id: string
  title: string
  name: string
  domainCode: DomainCode
  /** Bộ môn / ngành. */
  discipline: string
  /** Chuỗi hướng nghiên cứu, phân tách bằng "•". */
  researchDirection: string
  thesisCount: number
  articleCount: number
  acceptingStudents: boolean
  /** Đối tượng tiếp nhận; suy ra từ nhãn "Nhận SV"/"Đang nhận hướng dẫn". */
  audiences?: MentorAudience[]
  email?: string
  bio?: string
}

export interface Lab {
  id: string
  tag: string
  name: string
  domainCode: DomainCode
  domainLabel: string
  description: string
  focusTopics: string[]
  /** Chưa quan sát được với mọi Lab trong ảnh chụp màn hình. */
  lead?: { title: string; name: string }
  memberCount?: number
  /** Đề tài trọng điểm — chỉ hiển thị trên trang Lab. */
  keyProjects?: string[]
}

export type AnnouncementKind = 'news' | 'defense'

export interface Announcement {
  id: string
  kind: AnnouncementKind
  title: string
  date?: string
  meta?: string
}

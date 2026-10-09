import { Bell, Compass, FileText, FlaskConical, GraduationCap } from 'lucide-react'
import { announcementKindLabels, announcements } from '@/data/announcements'
import { labs } from '@/data/labs'
import { mentors } from '@/data/mentors'
import { publicationKindLabels, publications } from '@/data/publications'
import { PlaceholderPage } from '@/views/PlaceholderPage'

export function PublicationDetailPage({ id }: { id: string }) {
  const publication = publications.find((item) => item.id === id)

  if (!publication) return <NotFoundPage />

  return (
    <PlaceholderPage
      icon={FileText}
      title={publication.title}
      description={`${publicationKindLabels[publication.kind]} • Năm ${publication.year}`}
      facts={[
        { label: 'Tác giả', value: `${publication.author.name} (${publication.author.cohort})` },
        {
          label: 'GVHD',
          value: `${publication.advisor.title} ${publication.advisor.name}`,
        },
        { label: 'Chuyên ngành', value: publication.major },
        { label: 'Trụ cột', value: publication.domainLabel },
        { label: 'Lượt xem', value: String(publication.views) },
        { label: 'Lượt tải', value: String(publication.downloads) },
      ]}
      backTo="/tim-kiem"
      backLabel="Về trang tìm kiếm"
    />
  )
}

export function MentorDetailPage({ id }: { id: string }) {
  const mentor = mentors.find((item) => item.id === id)

  if (!mentor) return <NotFoundPage />

  return (
    <PlaceholderPage
      icon={GraduationCap}
      title={`${mentor.title} ${mentor.name}`}
      description={mentor.bio ?? mentor.researchDirection}
      facts={[
        { label: 'Học vị', value: mentor.title },
        { label: 'Bộ môn', value: mentor.discipline },
        { label: 'Hướng nghiên cứu', value: mentor.researchDirection },
        { label: 'Khóa luận', value: String(mentor.thesisCount) },
        { label: 'Bài báo', value: String(mentor.articleCount) },
        { label: 'Email', value: mentor.email ?? 'Chưa có trong dữ liệu quan sát' },
      ]}
      backTo="/giang-vien"
      backLabel="Về danh sách giảng viên & mentors"
    />
  )
}

export function LabDetailPage({ id }: { id: string }) {
  const lab = labs.find((item) => item.id === id)

  if (!lab) return <NotFoundPage />

  return (
    <PlaceholderPage
      icon={FlaskConical}
      title={lab.name}
      description={lab.description}
      facts={[
        { label: 'Mã Lab', value: lab.tag },
        { label: 'Trụ cột', value: lab.domainLabel },
        {
          label: 'Trưởng Lab',
          value: lab.lead
            ? `${lab.lead.title} ${lab.lead.name}`
            : 'Chưa có trong dữ liệu quan sát',
        },
        {
          label: 'Thành viên',
          value:
            typeof lab.memberCount === 'number'
              ? `${lab.memberCount}+ TV`
              : 'Chưa có trong dữ liệu quan sát',
        },
      ]}
      backTo="/lab"
      backLabel="Về danh sách phòng thí nghiệm / Lab"
    />
  )
}

export function AnnouncementsPage() {
  const firstAnnouncement = announcements[0]

  return (
    <PlaceholderPage
      icon={Bell}
      title="Lịch bảo vệ & Thông báo"
      description={
        firstAnnouncement
          ? `${announcementKindLabels[firstAnnouncement.kind]} — ${firstAnnouncement.title}`
          : undefined
      }
      backTo="/"
      backLabel="Về trang chủ"
    />
  )
}

export function NotFoundPage() {
  return (
    <PlaceholderPage
      icon={Compass}
      title="Không tìm thấy trang"
      description="Đường dẫn này không tồn tại trong bản tái tạo. Hãy dùng thanh điều hướng phía trên để quay lại các trang đã có."
      backTo="/"
      backLabel="Về trang chủ"
    />
  )
}

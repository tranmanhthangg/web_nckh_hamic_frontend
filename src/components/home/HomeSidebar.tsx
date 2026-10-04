import { ArrowRight, Bell, Building2, GraduationCap, TrendingUp } from 'lucide-react'
import { announcementKindLabels, announcementTotal, announcements } from '@/data/announcements'
import { hotResearchTopics } from '@/data/home'
import { Chip } from '@/components/ui/Chip'
import { Link } from '@/components/ui/Link'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { LabSidebarList } from '@/components/home/LabSidebarList'
import { MentorSidebarList } from '@/components/home/MentorSidebarList'

const sideLinkClass =
  'inline-flex items-center gap-1 text-sm font-medium text-slate-600 transition-colors hover:text-brand'

export function HomeSidebar() {
  return (
    <div className="divide-y divide-slate-200">
      <section className="pb-6">
        <SectionHeader
          icon={GraduationCap}
          title="Mentor Discovery"
          action={
            <Link to="/giang-vien" className={sideLinkClass}>
              Tìm Mentor
              <ArrowRight size={14} aria-hidden />
            </Link>
          }
        />
        <MentorSidebarList />
      </section>

      <section className="py-6">
        <SectionHeader
          icon={Building2}
          title="Phòng thí nghiệm & Nhóm NC"
          action={
            <Link to="/lab" className={sideLinkClass}>
              Tất cả
              <ArrowRight size={14} aria-hidden />
            </Link>
          }
        />
        <LabSidebarList />
      </section>

      <section className="py-6">
        <SectionHeader
          icon={TrendingUp}
          title="Chủ đề nghiên cứu trọng điểm"
        />
        <div className="mt-5 flex flex-wrap gap-2">
          {hotResearchTopics.map((topic) => (
            <Chip key={topic} tone="outline">
              {topic}
            </Chip>
          ))}
        </div>
      </section>

      <section className="pt-6">
        <SectionHeader
          icon={Bell}
          title="Lịch bảo vệ & Thông báo"
          action={
            <Link to="/thong-bao" className={sideLinkClass}>
              Xem ({announcementTotal})
            </Link>
          }
        />
        <ul className="mt-5 space-y-3">
          {announcements.map((item) => (
            <li key={item.id}>
              <Link
                to="/thong-bao"
                className="block rounded-lg border border-slate-200 p-4 transition-colors hover:bg-hover"
              >
                <span className="line-clamp-2 block text-sm font-medium text-slate-700">
                  {item.title}
                </span>
                <span className="mt-2 block text-right text-xs font-medium text-slate-500">
                  {announcementKindLabels[item.kind]}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}

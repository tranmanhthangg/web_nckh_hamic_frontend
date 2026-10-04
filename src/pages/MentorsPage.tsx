import { useMemo, useState } from 'react'
import { GraduationCap } from 'lucide-react'
import {
  mentorAudienceOptions,
  mentorDisciplineOptions,
  mentors,
} from '@/data/mentors'
import { Checkbox } from '@/components/ui/Checkbox'
import { Container } from '@/components/ui/Container'
import { EmptyNotice } from '@/components/ui/EmptyNotice'
import { PageHero } from '@/components/ui/PageHero'
import { SearchInput } from '@/components/ui/SearchInput'
import { Select } from '@/components/ui/Select'
import { MentorCard } from '@/components/mentors/MentorCard'
import type { MentorAudience } from '@/types'

export function MentorsPage() {
  const [query, setQuery] = useState('')
  const [discipline, setDiscipline] = useState('all')
  const [audience, setAudience] = useState('all')
  const [acceptingOnly, setAcceptingOnly] = useState(false)

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()

    return mentors.filter((mentor) => {
      if (acceptingOnly && !mentor.acceptingStudents) return false
      if (discipline !== 'all' && mentor.domainCode !== discipline) return false
      if (
        audience !== 'all' &&
        !mentor.audiences?.includes(audience as MentorAudience)
      ) {
        return false
      }
      if (!keyword) return true

      return [
        mentor.name,
        mentor.title,
        mentor.discipline,
        mentor.researchDirection,
      ]
        .join(' ')
        .toLowerCase()
        .includes(keyword)
    })
  }, [query, discipline, audience, acceptingOnly])

  return (
    <Container className="space-y-6">
      <PageHero
        icon={GraduationCap}
        kicker="MIM Mentor Discovery System"
        title="Khám Phá Giảng Viên & Người Hướng Dẫn Nghiên Cứu"
        description='Hệ thống hỗ trợ sinh viên trả lời câu hỏi "Tôi nên gặp ai và hướng nghiên cứu nào phù hợp với mình?" dựa trên chuyên môn thực tế, các chủ đề thầy cô đang mở và đối tượng tiếp nhận.'
      >
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-[minmax(0,2fr)_minmax(0,1.15fr)_minmax(0,0.95fr)_minmax(0,0.8fr)]">
          <SearchInput
            ariaLabel="Tìm theo tên Thầy/Cô hoặc từ khóa"
            placeholder="Tìm theo tên Thầy/Cô, từ khóa (NLP, XFEM, Tối ưu hóa, CVaR...)"
            value={query}
            onChange={setQuery}
          />
          <Select
            ariaLabel="Ngành và Bộ môn"
            size="lg"
            value={discipline}
            onChange={setDiscipline}
            options={mentorDisciplineOptions}
          />
          <Select
            ariaLabel="Đối tượng tiếp nhận"
            size="lg"
            value={audience}
            onChange={setAudience}
            options={mentorAudienceOptions}
          />
          <Checkbox
            label="Đang nhận SV"
            checked={acceptingOnly}
            onChange={setAcceptingOnly}
            className="h-12"
          />
        </div>
      </PageHero>

      {filtered.length === 0 ? (
        <EmptyNotice
          title="Không tìm thấy giảng viên phù hợp"
          description="Thử đổi từ khóa, ngành/bộ môn hoặc bỏ lọc đối tượng tiếp nhận."
        />
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {filtered.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      )}
    </Container>
  )
}

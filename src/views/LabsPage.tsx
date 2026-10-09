'use client'

import { useMemo, useState } from 'react'
import { FlaskConical } from 'lucide-react'
import { labs } from '@/data/labs'
import { Container } from '@/components/ui/Container'
import { EmptyNotice } from '@/components/ui/EmptyNotice'
import { PageHero } from '@/components/ui/PageHero'
import { SearchInput } from '@/components/ui/SearchInput'
import { LabCard } from '@/components/labs/LabCard'

export function LabsPage() {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => {
    const keyword = query.trim().toLowerCase()
    if (!keyword) return labs

    return labs.filter((lab) =>
      [lab.tag, lab.name, lab.description, ...lab.focusTopics]
        .join(' ')
        .toLowerCase()
        .includes(keyword),
    )
  }, [query])

  return (
    <Container className="space-y-6">
      <PageHero
        icon={FlaskConical}
        tone="amber"
        kicker="MIM-HUS Laboratories & Research Units"
        title="Phòng Thí Nghiệm & Nhóm Nghiên Cứu Chuyên Sâu"
        description="Khám phá các phòng thí nghiệm, trung tâm tính toán và nhóm nghiên cứu chuyên ngành của Khoa Toán - Cơ - Tin học. Nơi quy tụ các đề tài mũi nhọn và môi trường thực nghiệm cho sinh viên, học viên cao học và nghiên cứu sinh."
      >
        <SearchInput
          ariaLabel="Tìm theo tên Lab, đề tài hoặc trường nhóm"
          placeholder="Tìm theo tên Lab, đề tài hoặc trường nhóm..."
          value={query}
          onChange={setQuery}
          className="max-w-[30rem]"
        />
      </PageHero>

      {filtered.length === 0 ? (
        <EmptyNotice
          title="Không tìm thấy Lab phù hợp"
          description="Thử tìm theo tên Lab hoặc lĩnh vực nghiên cứu khác."
        />
      ) : (
        <div className="grid gap-5 lg:grid-cols-2">
          {filtered.map((lab) => (
            <LabCard key={lab.id} lab={lab} />
          ))}
        </div>
      )}
    </Container>
  )
}

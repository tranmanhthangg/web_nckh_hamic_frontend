import { Layers } from 'lucide-react'
import { domains } from '@/data/domains'
import { PillarCard } from '@/components/pillars/PillarCard'
import { Container } from '@/components/ui/Container'
import { PageHero } from '@/components/ui/PageHero'

export function PillarsPage() {
  return (
    <Container className="space-y-6">
      <PageHero
        icon={Layers}
        kicker="Hệ sinh thái học thuật MIM-HUS"
        title="5 Trụ Cột Nghiên Cứu & Đào Tạo Mũi Nhọn"
        description="Khoa Toán - Cơ - Tin học định hình hệ sinh thái tri thức gồm 5 trục nghiên cứu chủ đạo, liên kết mật thiết giữa lý thuyết giải tích/đại số nền tảng với trí tuệ nhân tạo, tính toán đa tỉ lệ và tối ưu hoá hệ thống lớn."
      />

      <div className="space-y-6">
        {domains.map((domain, index) => (
          <PillarCard
            key={domain.code}
            domain={domain}
            order={String(index + 1).padStart(2, '0')}
          />
        ))}
      </div>
    </Container>
  )
}

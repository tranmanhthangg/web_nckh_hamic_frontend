import { HomeSidebar } from '@/components/home/HomeSidebar'
import { HeroSection } from '@/components/home/HeroSection'
import { PillarGrid } from '@/components/home/PillarGrid'
import { PublicationsSection } from '@/components/home/PublicationsSection'
import { Card } from '@/components/ui/Card'
import { Container } from '@/components/ui/Container'

export function HomePage() {
  return (
    <Container className="space-y-6">
      <HeroSection />

      <Card className="p-6">
        <PillarGrid />

        <div className="mt-6 grid gap-8 border-t border-slate-200 pt-6 lg:grid-cols-3">
          <PublicationsSection />
          <HomeSidebar />
        </div>
      </Card>
    </Container>
  )
}

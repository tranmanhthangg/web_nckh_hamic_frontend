import { ArrowRight } from 'lucide-react'
import { homeHero } from '@/data/home'
import { buildPath, navigate } from '@/router/router'
import { Card } from '@/components/ui/Card'
import { Chip } from '@/components/ui/Chip'
import { SearchInput } from '@/components/ui/SearchInput'

export function HeroSection() {
  return (
    <Card className="px-6 py-10 text-center sm:px-8 sm:py-12">
      <p className="text-base text-slate-600">{homeHero.kicker}</p>

      <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-brand-dark">
        {homeHero.title}
      </h1>

      <p className="mx-auto mt-3 text-base text-slate-600">
        {homeHero.subtitle}
      </p>

      <form
        role="search"
        className="mx-auto mt-7 max-w-3xl"
        onSubmit={(event) => {
          event.preventDefault()
          const value = String(
            new FormData(event.currentTarget).get('q') ?? '',
          ).trim()
          // Không nhập gì → không điều hướng.
          if (!value) return
          navigate(buildPath('/tim-kiem', { q: value }))
        }}
      >
        <SearchInput
          name="q"
          ariaLabel="Tìm kiếm công trình, giảng viên, khóa luận, DOI"
          placeholder={homeHero.searchPlaceholder}
          size="lg"
          submitLabel={homeHero.submitLabel}
          submitIcon={ArrowRight}
        />
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-base">
        {homeHero.stats.map((stat, index) => (
          <span key={stat.label} className="flex items-center gap-3">
            {index > 0 ? (
              <span aria-hidden className="text-slate-300">
                •
              </span>
            ) : null}
            <span>
              <span className="font-bold text-brand-dark">{stat.value}</span>{' '}
              <span className="text-slate-600">{stat.label}</span>
            </span>
          </span>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span className="text-sm text-slate-500">{homeHero.topicsLabel}</span>
        {homeHero.topics.map((topic) => (
          <Chip key={topic} tone="outline">
            {topic}
          </Chip>
        ))}
      </div>
    </Card>
  )
}

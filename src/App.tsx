import { useEffect } from 'react'
import { AppShell } from '@/components/layout/AppShell'
import { HomePage } from '@/pages/HomePage'
import { SearchPage } from '@/pages/SearchPage'
import { PillarsPage } from '@/pages/PillarsPage'
import { MentorsPage } from '@/pages/MentorsPage'
import { LabsPage } from '@/pages/LabsPage'
import {
  AnnouncementsPage,
  LabDetailPage,
  MentorDetailPage,
  NotFoundPage,
  PublicationDetailPage,
} from '@/pages/DetailPages'
import { useRoute } from '@/router/useRoute'
import type { RouterState } from '@/router/router'

function renderPage(route: RouterState) {
  const [section, param] = route.segments

  switch (section) {
    case undefined:
      return <HomePage />
    case 'tim-kiem':
      // key theo URL để ô tìm kiếm nhận từ khóa mới từ header/hero.
      return <SearchPage key={route.raw} />
    case 'tru-cot':
      return <PillarsPage />
    case 'giang-vien':
      return param ? <MentorDetailPage id={param} /> : <MentorsPage />
    case 'lab':
      return param ? <LabDetailPage id={param} /> : <LabsPage />
    case 'cong-trinh':
      return param ? <PublicationDetailPage id={param} /> : <NotFoundPage />
    case 'thong-bao':
      return <AnnouncementsPage />
    default:
      return <NotFoundPage />
  }
}

function App() {
  const route = useRoute()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [route.raw])

  return <AppShell>{renderPage(route)}</AppShell>
}

export default App

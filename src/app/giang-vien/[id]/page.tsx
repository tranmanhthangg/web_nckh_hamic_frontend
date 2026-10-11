import type { Metadata } from 'next'
import { mentors } from '@/data/mentors'
import { MentorDetailPage } from '@/views/DetailPages'

/**
 * Hồ sơ giảng viên — params là Promise trong App Router (Next 15+).
 * Known ids được prerender lúc build; id lạ render-on-demand như cũ.
 */

export function generateStaticParams() {
  return mentors.map((item) => ({ id: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const mentor = mentors.find((item) => item.id === id)

  return {
    title: mentor ? `${mentor.title} ${mentor.name}` : 'Hồ sơ giảng viên',
  }
}

export default async function MentorDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MentorDetailPage id={id} />
}


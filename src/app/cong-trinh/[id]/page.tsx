import type { Metadata } from 'next'
import { publications } from '@/data/publications'
import { PublicationDetailPage } from '@/views/DetailPages'

/**
 * Chi tiết công trình NCKH — params là Promise trong App Router (Next 15+).
 * Known ids được prerender lúc build; id lạ render-on-demand như cũ.
 */

export function generateStaticParams() {
  return publications.map((item) => ({ id: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const publication = publications.find((item) => item.id === id)

  return {
    title: publication ? publication.title : 'Chi tiết công trình NCKH',
  }
}

export default async function PublicationDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PublicationDetailPage id={id} />
}


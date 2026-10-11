import type { Metadata } from 'next'
import { labs } from '@/data/labs'
import { LabDetailPage } from '@/views/DetailPages'

/**
 * Chi tiết Lab — params là Promise trong App Router (Next 15+).
 * Known ids được prerender lúc build; id lạ render-on-demand như cũ.
 */

export function generateStaticParams() {
  return labs.map((item) => ({ id: item.id }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const lab = labs.find((item) => item.id === id)

  return { title: lab ? lab.name : 'Chi tiết Lab' }
}

export default async function LabDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <LabDetailPage id={id} />
}


import { PublicationDetailPage } from '@/views/DetailPages'

/** Chi tiết công trình NCKH — params là Promise trong App Router (Next 15+). */
export default async function PublicationDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <PublicationDetailPage id={id} />
}

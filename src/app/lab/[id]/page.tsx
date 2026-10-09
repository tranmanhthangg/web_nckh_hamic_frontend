import { LabDetailPage } from '@/views/DetailPages'

/** Chi tiết Lab — params là Promise trong App Router (Next 15+). */
export default async function LabDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <LabDetailPage id={id} />
}

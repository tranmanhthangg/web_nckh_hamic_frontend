import { MentorDetailPage } from '@/views/DetailPages'

/** Hồ sơ giảng viên — params là Promise trong App Router (Next 15+). */
export default async function MentorDetailRoutePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  return <MentorDetailPage id={id} />
}

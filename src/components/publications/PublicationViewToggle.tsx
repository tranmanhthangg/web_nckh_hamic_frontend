import { LayoutGrid, LayoutList } from 'lucide-react'
import { SegmentedToggle } from '@/components/ui/SegmentedToggle'

export type PublicationView = 'grid' | 'list'

interface PublicationViewToggleProps {
  value: PublicationView
  onChange: (value: PublicationView) => void
  className?: string
}

export function PublicationViewToggle({
  value,
  onChange,
  className,
}: PublicationViewToggleProps) {
  return (
    <SegmentedToggle<PublicationView>
      ariaLabel="Chế độ hiển thị danh sách công trình"
      value={value}
      onChange={onChange}
      className={className}
      options={[
        { value: 'list', label: 'Danh sách', icon: LayoutList },
        { value: 'grid', label: 'Dạng ô', icon: LayoutGrid },
      ]}
    />
  )
}

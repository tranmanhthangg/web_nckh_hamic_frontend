import { cn } from '@/lib/cn'
import { headerContent } from '@/data/site'
import { buildPath, navigate } from '@/router/router'
import { SearchInput } from '@/components/ui/SearchInput'

interface HeaderSearchProps {
  className?: string
  shape?: 'pill' | 'rounded'
}

/** Ô tìm kiếm trên header: chuyển sang trang "Bản đồ Tri thức & Tìm kiếm". */
export function HeaderSearch({
  className,
  shape = 'pill',
}: HeaderSearchProps) {
  return (
    <form
      role="search"
      className={cn('w-full', className)}
      onSubmit={(event) => {
        event.preventDefault()
        const value = new FormData(event.currentTarget).get('q')
        navigate(buildPath('/tim-kiem', { q: String(value ?? '') }))
      }}
    >
      <SearchInput
        name="q"
        ariaLabel="Tìm kiếm công trình, giảng viên, khóa luận, DOI"
        placeholder={headerContent.searchPlaceholder}
        size="sm"
        shape={shape}
        inputClassName="bg-page"
      />
    </form>
  )
}

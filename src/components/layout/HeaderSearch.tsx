'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { cn } from '@/lib/cn'
import { headerContent } from '@/data/site'
import { buildPath } from '@/router/router'
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
  const router = useRouter()
  const [value, setValue] = useState('')

  return (
    <form
      role="search"
      className={cn('w-full', className)}
      onSubmit={(event) => {
        event.preventDefault()
        const query = value.trim()
        // Không nhập gì → không điều hướng.
        if (!query) return
        router.push(buildPath('/tim-kiem', { q: query }))
        // Tự xóa text trên header sau khi đã gửi sang trang Tìm kiếm.
        setValue('')
      }}
    >
      <SearchInput
        name="q"
        ariaLabel="Tìm kiếm công trình, giảng viên, khóa luận, DOI"
        placeholder={headerContent.searchPlaceholder}
        value={value}
        onChange={setValue}
        size="sm"
        shape={shape}
        inputClassName="bg-slate-100"
      />
    </form>
  )
}

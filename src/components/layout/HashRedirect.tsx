'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Chuyển tiếp liên kết hash cũ (vd: /#/tim-kiem?q=x) sang đường dẫn App
 * Router (/tim-kiem?q=x) để bookmark/đường dẫn chia sẻ trước migration
 * không bị 404. Không làm gì nếu URL không có hash dạng "#/...".
 */
export function HashRedirect() {
  const router = useRouter()

  useEffect(() => {
    const hash = window.location.hash
    if (!hash.startsWith('#/')) return

    router.replace(hash.slice(1))
  }, [router])

  return null
}

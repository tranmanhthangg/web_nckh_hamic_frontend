import { MainNav } from './MainNav'
import { PortalBar } from './PortalBar'
import { SiteHeader } from './SiteHeader'

/**
 * Khối dính trên cùng khi cuộn: dải portal ĐHQGHN + header + điều hướng chính
 * (thanh gỡ lỗi RBAC nằm ngoài khối này nên sẽ cuộn khỏi màn hình).
 */
export function AppHeader() {
  return (
    <>
      <PortalBar />
      <SiteHeader />
      <MainNav />
    </>
  )
}

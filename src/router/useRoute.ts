import { useSyncExternalStore } from 'react'
import { getRouterSnapshot, subscribeRouter } from './router'
import type { RouterState } from './router'

/** Theo dõi route hiện tại từ hash của trình duyệt. */
export function useRoute(): RouterState {
  return useSyncExternalStore(
    subscribeRouter,
    getRouterSnapshot,
    getRouterSnapshot,
  )
}

import type { AsyncDataRequestStatus } from '#app'
import type { CollectionsListItem } from '#shared/api'

export interface UseCollectionsResult {
  data: Ref<CollectionsListItem[] | undefined>
  status: Ref<AsyncDataRequestStatus>
  execute: () => Promise<void>
}

export const useCollections = createSharedComposable<() => UseCollectionsResult>(() => {
  const { data, status, execute } = useApi('/api/collections', {
    key: 'collections',
    immediate: false,
  })

  return {
    data,
    status,
    execute,
  }
})

import type { AsyncDataRequestStatus } from '#app'
import type { CollectionsListItem } from '#shared/api'

export interface UseCollectionsResult {
  data: Ref<CollectionsListItem[] | undefined>
  status: Ref<AsyncDataRequestStatus>
  execute: () => Promise<void>
  refresh: () => Promise<void>
}

export const useCollections = createSharedComposable<() => UseCollectionsResult>(() => {
  const { data, status, execute, refresh } = useApi('/api/collections', {
    key: 'collections',
    immediate: false,
    transform: transformCollections,
  })

  return {
    data,
    status,
    execute,
    refresh,
  }
})

export function transformCollections(collections: CollectionsListItem[]): CollectionsListItem[] {
  const items: CollectionsListItem[] = []

  for (const { children, ...collection } of collections) {
    items.push({
      ...collection,
      children: children ? transformCollections(children) : [],
    })
  }

  return items
}

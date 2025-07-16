import type { AsyncDataRequestStatus } from '#app'
import type { CollectionsListItem, CUID } from '#shared/api'

export interface UseCollectionsResult {
  data: Ref<CollectionsListItem[] | undefined>
  status: Ref<AsyncDataRequestStatus>
  execute: () => Promise<void>
  refresh: () => Promise<void>
  visibleItems: Ref<CUID[]>
}

export const useCollections = createSharedComposable<() => UseCollectionsResult>(() => {
  // visible items, used for the accordion.
  const visibleItems = useLocalStorage<CUID[]>('shotly-collections-menu', [])

  const { data, status, execute, refresh } = useApi('/api/collections', {
    key: 'collections',
    immediate: false,
    onResponse: ({ response }) => {
      // recalculate visible items, because an item can be removed from the list.
      visibleItems.value = visibleItems.value.filter((id) => response._data.some((item: CollectionsListItem) => item.id === id && item.children.length > 0))
    },
  })

  return {
    data,
    status,
    execute,
    refresh,
    visibleItems,
  }
})

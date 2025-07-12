import type { AsyncDataRequestStatus } from '#app'
import type { CollectionsListItem, CUID } from '#shared/api'

export interface UseCollectionsItem {
  label: string
  value: CUID
  icon: string
}

export interface UseCollectionsResult {
  data: Ref<CollectionsListItem[] | undefined>
  items: ComputedRef<UseCollectionsItem[]>
  status: Ref<AsyncDataRequestStatus>
  execute: () => Promise<void>
  refresh: () => Promise<void>
}

export const useCollections = createSharedComposable<() => UseCollectionsResult>(() => {
  const { data, status, execute, refresh } = useApi('/api/collections', {
    key: 'collections',
    immediate: false,
  })

  const items = computed(() =>
    (data.value ?? [])
      .filter((item) => !item.children)
      .map((item) => ({
        label: item.name,
        value: item.id,
        icon: item.icon ?? 'lucide:folder',
      })),
  )

  return {
    data,
    items,
    status,
    execute,
    refresh,
  }
})

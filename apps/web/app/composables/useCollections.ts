import type { AsyncDataRequestStatus } from '#app'
import type { CollectionsListItem, CUID } from '#shared/api'
import type { RouteLocationRaw } from 'vue-router'

export interface TransformCollectionsItem {
  label: string
  value: CUID
  icon: string
  to: RouteLocationRaw
  children?: TransformCollectionsItem[]
}

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
  })

  return {
    data,
    status,
    execute,
    refresh,
  }
})

export function transformCollections(collections: CollectionsListItem[]): TransformCollectionsItem[] {
  const items: TransformCollectionsItem[] = []

  for (const collection of collections) {
    items.push({
      label: collection.name,
      value: collection.id,
      icon: collection.icon,
      to: { name: 'collections-id', params: { id: collection.id } },
      children: collection.children ? transformCollections(collection.children) : undefined,
    })
  }

  return items
}

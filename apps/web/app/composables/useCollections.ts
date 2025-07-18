import type { AsyncDataRequestStatus } from '#app'
import type { CollectionsListItem, CUID } from '#shared/api'
import { flattenTree } from '#shared/tree'

export type ViewLayout = 'grid' | 'list' | 'stack'

export interface UseCollectionsResult {
  tree: Ref<CollectionsListItem[]>
  list: ComputedRef<CollectionsListItem[]>
  map: ComputedRef<Map<CUID, CollectionsListItem>>
  status: Ref<AsyncDataRequestStatus>
  execute: () => Promise<void>
  refresh: () => Promise<void>
  visibleItems: Ref<CUID[]>
  viewLayout: Ref<ViewLayout>
  displayProperties: Ref<string[]>
}

export const useCollections = createSharedComposable<() => UseCollectionsResult>(() => {
  // visible items, used for the accordion.
  const visibleItems = useLocalStorage<CUID[]>('shotly-collections-menu', [])

  // view layout, used for the view layout dropdown.
  const viewLayout = useLocalStorage<ViewLayout>('shotly-collections-view-layout', 'grid')

  // display properties, used for the display properties dropdown.
  const displayProperties = useLocalStorage<string[]>('shotly-collections-display-properties', [
    'link', 'name', 'image', 'icon', 'date',
  ])

  const { data: tree, status, execute, refresh } = useApi('/api/collections', {
    key: 'collections',
    immediate: false,
    default: () => [],
    onResponse: ({ response }) => {
      // recalculate visible items, because an item can be removed from the list.
      visibleItems.value = visibleItems.value.filter((id) => response._data.some((item: CollectionsListItem) => item.id === id && item.children.length > 0))
    },
  })

  const list = computed(() => flattenTree(tree.value))
  const map = computed(() => new Map(list.value.map((item) => [item.id, item])))

  return {
    tree,
    list,
    map,
    status,
    execute,
    refresh,
    visibleItems,
    viewLayout,
    displayProperties,
  }
})

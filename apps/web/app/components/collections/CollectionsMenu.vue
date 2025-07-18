<template>
  <div class="flex flex-col gap-2 relative">
    <div class="flex items-center justify-between">
      <div class="text-sm text-muted">
        {{ $t('collections.title') }}
      </div>
      <div class="flex items-center pr-1">
        <template v-if="isSortMode">
          <UTooltip :text="$t('common.actions.cancel')" :content="{ side: 'top' }">
            <UButton
              icon="lucide:x"
              size="sm"
              variant="ghost"
              color="neutral"
              @click="handleCancelSort"
            />
          </UTooltip>
          <UTooltip :text="$t('common.actions.apply')" :content="{ side: 'top' }">
            <UButton
              icon="lucide:check"
              size="sm"
              variant="ghost"
              color="neutral"
              loading-auto
              @click="handleApplySort"
            />
          </UTooltip>
        </template>
        <UDropdownMenu
          v-else
          :items="options"
          :content="{ side: 'bottom', align: 'end' }"
          :ui="{ content: 'w-56' }"
        >
          <UButton
            icon="lucide:settings-2"
            size="sm"
            variant="ghost"
            color="neutral"
          />
        </UDropdownMenu>
      </div>
    </div>

    <CollectionsMenuSort v-if="isSortMode" v-model="sortingCollections" />
    <CollectionsMenuView v-else :items="collections" />
  </div>
</template>

<script setup lang="ts">
import type { CollectionsListItem, CollectionsReorganizeItem } from '#shared/api'
import type { DropdownMenuItem } from '@nuxt/ui'
import { LazyCollectionsFormModal } from '#components'

const { $api } = useNuxtApp()
const { data: collections, refresh: refreshCollections } = useCollections()

const isSortMode = ref(false)
const { cloned: sortingCollections, sync: syncSortingCollections } = useCloned(() => collections.value ?? [])

const createCollectionModal = useOverlay().create(LazyCollectionsFormModal)

/**
 * Normalize sorting collections, return flat array of items with parentId & sortOrder (gap-based ordering)
 */
function normalizeReorganizeCollections(collections?: CollectionsListItem[], level = 0, parentId: string | null = null): CollectionsReorganizeItem[] {
  if (!collections) {
    return []
  }

  const items: CollectionsReorganizeItem[] = []

  for (const [index, collection] of collections.entries()) {
    items.push({
      id: collection.id,
      parentId: level === 0 ? null : parentId,
      sortOrder: (index + 1) * 1000,
    })

    if (collection.children) {
      items.push(...normalizeReorganizeCollections(collection.children, level + 1, collection.id))
    }
  }

  return items
}

/**
 * Get reorganize diff.
 * Check only parentId and sortOrder fields.
 */
function getReorganizeDiff(initial: CollectionsReorganizeItem[], current: CollectionsReorganizeItem[]) {
  const initialMap = new Map(initial.map((item) => [item.id, item]))
  const diff: CollectionsReorganizeItem[] = []

  for (const curr of current) {
    const prev = initialMap.get(curr.id)

    if (!prev) {
      diff.push(curr)
      continue
    }

    if (prev.parentId !== curr.parentId || prev.sortOrder !== curr.sortOrder) {
      diff.push(curr)
    }
  }

  return diff
}

function handleCancelSort() {
  isSortMode.value = false
  syncSortingCollections()
}

async function handleApplySort() {
  // Get only diff items
  const flatDiff = getReorganizeDiff(
    normalizeReorganizeCollections(collections.value),
    normalizeReorganizeCollections(sortingCollections.value),
  )

  await $api('/api/collections/reorganize', {
    method: 'put',
    body: flatDiff,
  })
  await refreshCollections()

  isSortMode.value = false
  syncSortingCollections()
}

const options = computed<DropdownMenuItem[]>(() => [
  {
    label: $t('common.actions.create'),
    kbds: ['c'],
    icon: 'lucide:plus',
    onSelect: () => createCollectionModal.open({
      onSuccess: () => createCollectionModal.close(),
    }),
  },
  {
    label: $t('common.actions.reorganize'),
    kbds: ['r'],
    icon: 'lucide:send-to-back',
    onSelect: () => isSortMode.value = true,
  },
])
</script>

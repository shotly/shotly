<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <UNavigationMenu :items="mainMenu" orientation="vertical" />

      <div class="flex flex-col gap-2 mt-4 border-t border-default dark:border-accented/80 pt-4 relative">
        <div class="flex items-center justify-between">
          <div class="text-sm text-muted">
            {{ $t('collections.title') }}
          </div>
          <div class="flex items-center pr-1">
            <UButton
              v-if="isCollectionsSortMode"
              icon="lucide:check"
              size="sm"
              variant="ghost"
              color="neutral"
              @click="isCollectionsSortMode = false"
            />
            <UDropdownMenu v-else :items="collectionsOptions">
              <UButton
                icon="lucide:settings-2"
                size="sm"
                variant="ghost"
                color="neutral"
              />
            </UDropdownMenu>
          </div>
        </div>

        <CollectionsSortMenu v-if="isCollectionsSortMode && collections" v-model="collections" />
        <CollectionsMenu v-else :items="collections" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem, NavigationMenuItem } from '@nuxt/ui'

const { isCollectionsFormModalOpen } = useApp()
const { data: collections } = useCollections()
const isCollectionsSortMode = ref(true)

const mainMenu = computed<NavigationMenuItem[]>(() => [
  {
    label: $t('bookmarks.title'),
    icon: 'lucide:bookmark',
  },
  {
    label: $t('bookmarks.inbox'),
    icon: 'lucide:inbox',
  },
  {
    label: $t('bookmarks.random'),
    icon: 'lucide:dices',
  },
])

const collectionsOptions = computed<DropdownMenuItem[]>(() => [
  {
    label: 'Create', // $t('collections.create'),
    icon: 'lucide:plus',
    kbds: ['c'],
    onSelect: () => isCollectionsFormModalOpen.value = true,
  },
  {
    label: 'Sort', // $t('collections.sort'),
    icon: 'lucide:list-ordered',
    onSelect: () => isCollectionsSortMode.value = true,
  },
])
</script>

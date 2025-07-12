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
            <!-- <UTooltip :text="$t('collections.create.tooltip')" :kbds="['c']">
              <UButton
                icon="lucide:settings-2"
                size="sm"
                variant="ghost"
                color="neutral"
              />
            </UTooltip> -->
            <UTooltip :text="$t('collections.create.tooltip')" :kbds="['c']">
              <UButton
                icon="lucide:plus"
                size="sm"
                variant="ghost"
                color="neutral"
                @click="isCollectionsFormModalOpen = true"
              />
            </UTooltip>
          </div>
        </div>

        <CollectionsMenu />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

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

const { isCollectionsFormModalOpen } = useApp()
const { data: collections } = useCollections()

const collectionsMenu = computed(() => transformCollections(collections.value ?? []))
</script>

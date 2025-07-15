<template>
  <div class="h-full flex flex-col">
    <div class="sticky top-0 border-b border-default dark:border-accented/80 pb-4 mb-4 z-1">
      <UNavigationMenu :items="mainMenu" orientation="vertical" />
    </div>

    <CollectionsMenu />
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
</script>

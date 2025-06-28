<template>
  <div class="h-full flex flex-col">
    <div class="flex-1 overflow-y-auto">
      <UNavigationMenu :items="mainMenu" orientation="vertical" />

      <div class="flex flex-col gap-2 mt-4 border-t border-default dark:border-accented/80 pt-4">
        <div class="flex items-center justify-between">
          <div class="text-sm text-muted">
            {{ $t('collections.title') }}
          </div>
          <div>
            <UButton
              icon="lucide:plus"
              size="sm"
              variant="ghost"
              color="neutral"
            />
          </div>
        </div>

        <UNavigationMenu :items="collections" orientation="vertical" />
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
    disabled: true,
    badge: { label: $t('soon.badge') },
  },
  {
    label: $t('bookmarks.inbox'),
    icon: 'lucide:inbox',
    disabled: true,
    badge: { label: $t('soon.badge') },
  },
  {
    label: $t('bookmarks.random'),
    icon: 'lucide:dices',
    disabled: true,
    badge: { label: $t('soon.badge') },
  },
])

// todo: replace with real collections
const collections: NavigationMenuItem[] = [
  { label: 'Ideas', icon: 'lucide:sparkles' },
  { label: 'Projects', icon: 'lucide:folder' },
  { label: 'Tasks', icon: 'lucide:list-check' },
  { label: 'Notes', icon: 'lucide:file-text' },
  { label: 'Links', icon: 'lucide:link' },
  { label: 'Files', icon: 'lucide:file' },
  { label: 'Images', icon: 'lucide:image' },
  { label: 'Videos', icon: 'lucide:video' },
  { label: 'Audio', icon: 'lucide:music' },
  { label: 'Documents', icon: 'lucide:file-text' },
]
</script>

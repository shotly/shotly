<template>
  <UHeader :ui="{ root: 'bg-transparent backdrop-blur-none border-transparent z-50 relative' }">
    <template #left>
      <AppLogotype />
    </template>

    <UNavigationMenu
      :items="items"
      :ui="{ list: 'gap-4' }"
      variant="link"
    />

    <template #right>
      <UTooltip text="Soon">
        <UButton label="Try Demo" class="px-3 py-2 rounded-full" disabled />
      </UTooltip>
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        :ui="{ list: 'gap-4' }"
        orientation="vertical"
        variant="link"
      />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Docs',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs'),
  },
  {
    label: 'Releases',
    to: 'https://github.com/shotly/shotly/releases',
    target: '_blank',
  },
])
</script>

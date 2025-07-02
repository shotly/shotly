<template>
  <UHeader mode="drawer" :ui="{ root: 'bg-transparent backdrop-blur-none border-transparent z-50 relative' }">
    <template #left>
      <AppLogotype />
    </template>

    <UNavigationMenu
      :items="items"
      :ui="{ list: 'gap-4' }"
      variant="link"
    />

    <template #right>
      <UButton
        label="Open App"
        class="px-3 py-2 rounded-full"
        :to="appConfig.links.app"
        :external="true"
      />
    </template>

    <template #body>
      <UNavigationMenu
        :items="items"
        :ui="{ list: 'gap-4 -mx-2' }"
        orientation="vertical"
      />

      <template v-if="$slots.body">
        <USeparator class="my-4" />

        <slot name="body" />
      </template>
    </template>
  </UHeader>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

export interface AppHeaderSlots {
  body?: () => any
}

const appConfig = useAppConfig()
const route = useRoute()

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: 'Guide',
    to: '/docs/getting-started',
    active: route.path.startsWith('/docs'),
  },
  {
    label: 'Extension',
  },
  {
    label: 'Blog',
  },
  {
    label: 'Releases',
  },
])
</script>

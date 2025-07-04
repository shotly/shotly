<template>
  <div class="h-full">
    <UNavigationMenu :items="mainMenu" orientation="vertical" />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const mainMenu = computed<NavigationMenuItem[]>(() => [
  {
    label: $t('aside.back'),
    icon: 'lucide:arrow-left',
    to: { name: 'index' },
  },
  {
    label: $t('admin.console'),
    icon: 'lucide:gauge',
    to: { name: 'admin-console' },
  },
  {
    label: $t('admin.users'),
    icon: 'lucide:users',
    to: { name: 'admin-users' },
  },
])
</script>

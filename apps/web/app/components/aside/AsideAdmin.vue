<template>
  <div class="h-full">
    <UNavigationMenu :items="mainMenu" orientation="vertical" />
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const mainMenu = computed<NavigationMenuItem[]>(() => [
  {
    label: $t('common.actions.back'),
    icon: 'lucide:arrow-left',
    to: { name: 'index' },
  },
  {
    label: $t('admin.console.title'),
    icon: 'lucide:gauge',
    to: { name: 'admin-console' },
  },
  {
    label: $t('admin.users.title'),
    icon: 'lucide:users',
    to: { name: 'admin-users' },
  },
])
</script>

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
])
</script>

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
    label: $t('settings.profile'),
    icon: 'lucide:user',
    to: { name: 'settings-profile' },
  },
  {
    label: $t('settings.apiKeys'),
    icon: 'lucide:key-round',
    to: { name: 'settings-api-keys' },
  },
  {
    label: $t('settings.import'),
    icon: 'lucide:cloud-download',
    to: { name: 'settings-import' },
  },
  {
    label: $t('settings.webhooks'),
    icon: 'lucide:webhook',
    to: { name: 'settings-webhooks' },
  },
])
</script>

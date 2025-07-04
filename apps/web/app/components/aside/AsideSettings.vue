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
    label: $t('settings.profile.title'),
    icon: 'lucide:user',
    to: { name: 'settings-profile' },
  },
  {
    label: $t('settings.apiKeys.title'),
    icon: 'lucide:key-round',
    to: { name: 'settings-api-keys' },
  },
  {
    label: $t('settings.import.title'),
    icon: 'lucide:cloud-download',
    to: { name: 'settings-import' },
  },
  {
    label: $t('settings.webhooks.title'),
    icon: 'lucide:webhook',
    to: { name: 'settings-webhooks' },
  },
])
</script>

<template>
  <UFooter>
    <template #left>
      <div class="text-xs">
        <span class="text-muted"> © {{ new Date().getFullYear() }} - Made by </span>
        <ULink to="https://hywax.space" class="hover:underline">
          Hywax
        </ULink>
      </div>
    </template>

    <UNavigationMenu
      :items="navigation"
      :ui="{ list: 'lg:gap-4' }"
      variant="link"
    />

    <template #right>
      <UButton
        color="neutral"
        variant="ghost"
        :to="appConfig.links.repository"
        target="_blank"
        icon="simple-icons:github"
        size="sm"
      />
      <UColorModeButton size="sm" />
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

const navigation = computed(() => [
  {
    label: 'Guide',
    to: '/docs/getting-started',
  },
  {
    label: 'Releases',
  },
  {
    label: 'Extension',
  },
  {
    label: 'Terms',
  },
  {
    label: 'Status',
  },
])
</script>

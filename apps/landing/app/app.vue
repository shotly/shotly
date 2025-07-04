<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <ClientOnly>
      <LazyUContentSearch
        :files="files"
        :navigation="navigation"
        :fuse="{ resultLimit: 42 }"
        :links="links"
        shortcut="meta_k"
      />
    </ClientOnly>
  </UApp>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  titleTemplate: `%s - ${appConfig.name}`,
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
  transform: (data) => data.flat(),
})

const links = computed(() => [
  ...(navigation.value || []).map((item) => ({
    label: item.title,
    icon: item.icon,
    to: item.path === '/docs' ? '/docs/getting-started' : item.path,
  })),
  {
    label: 'Application',
    to: appConfig.links.app,
    target: '_blank',
    icon: 'shotly:logo-symbol',
  },
  {
    label: 'GitHub Repository',
    to: appConfig.links.repository,
    target: '_blank',
    icon: 'simple-icons:github',
  },
])

provide('navigation', navigation!)
</script>

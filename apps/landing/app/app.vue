<template>
  <UApp>
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  titleTemplate: `%s - ${appConfig.name}`,
})

const { data: navigation } = await useAsyncData('navigation', () => queryCollectionNavigation('docs'))
const { data: _files } = useLazyAsyncData('search', () => queryCollectionSearchSections('docs'), {
  server: false,
  transform: (data) => data.flat(),
})

provide('navigation', navigation!)
</script>

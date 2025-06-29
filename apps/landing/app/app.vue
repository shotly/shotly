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

const [{ data: navigation }] = await Promise.all([
  useAsyncData('navigation', () => {
    return Promise.all([
      queryCollectionNavigation('docs'),
    ])
  }, {
    transform: (data) => data.flat(),
  }),
  useLazyAsyncData('search', () => {
    return Promise.all([
      queryCollectionSearchSections('docs'),
    ])
  }, {
    server: false,
    transform: (data) => data.flat(),
  }),
])

provide('navigation', navigation!)
</script>

<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
definePageMeta({
  redirect: { name: 'settings-profile' },
})

const appConfig = useAppConfig()

useSeoMeta({
  titleTemplate: () => `%s - ${$t('settings.title')} - ${appConfig.name}`,
})
</script>

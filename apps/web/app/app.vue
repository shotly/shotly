<template>
  <UApp :locale="uiLocale">
    <NuxtLoadingIndicator color="var(--ui-primary)" :height="2" />

    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import * as locales from '@nuxt/ui/locale'

const { locale } = useI18n()
const appConfig = useAppConfig()

const uiLocale = computed(() => locales[locale.value])

useSeoMeta({
  titleTemplate: `%s - ${appConfig.name}`,
})
</script>

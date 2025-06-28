<template>
  <div class="flex flex-col items-center justify-center h-screen">
    <UIcon name="shotly:logo-symbol" class="size-8" />
    <div class="text-xl mt-4">
      Coming Soon
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `${appConfig.name} - ${appConfig.description}`,
  titleTemplate: '%s',
})
</script>

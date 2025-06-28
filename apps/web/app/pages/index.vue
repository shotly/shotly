<template>
  <div />
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `${appConfig.name} - ${appConfig.description}`,
  titleTemplate: '%s',
})
</script>

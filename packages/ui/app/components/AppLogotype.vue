<template>
  <NuxtLink :to="{ name: 'index' }" class="flex items-center gap-2 focus-visible:outline-primary">
    <UIcon name="shotly:logo-symbol" class="size-5" />
    <div class="text-lg font-medium">
      {{ appConfig.name }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

<template>
  <NuxtLink :to="{ name: 'index' }" class="flex items-center gap-2 focus-visible:outline-primary">
    <UIcon name="shotly:logo" class="size-6" />
    <div class="font-semibold">
      {{ appConfig.name }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

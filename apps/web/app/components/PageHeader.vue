<template>
  <div class="flex flex-col gap-1">
    <h1 class="text-xl font-medium text-highlighted">
      {{ title }}
    </h1>
    <p class="text-sm text-muted">
      <slot name="description">
        {{ description }}
      </slot>
    </p>
  </div>
</template>

<script setup lang="ts">
export interface PageHeaderProps {
  title: string
  description?: string
}

export interface PageHeaderSlots {
  description?: () => any
}

defineProps<PageHeaderProps>()
defineSlots<PageHeaderSlots>()
</script>

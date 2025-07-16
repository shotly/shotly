<template>
  <ULink
    :href="href"
    target="_blank"
    inactive-class="text-secondary border-b"
    external
  >
    <span>{{ label }}</span>
    <UIcon name="lucide:arrow-up-right" class="size-3" />
  </ULink>
</template>

<script setup lang="ts">
export interface LinkBlankProps {
  href: string
  label: string
}

defineProps<LinkBlankProps>()
</script>

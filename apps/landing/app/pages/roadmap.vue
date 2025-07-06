<template>
  <div class="h-[calc(100dvh-var(--ui-header-height))]">
    <ClientOnly>
      <iframe :src="src" width="100%" height="100%" />
    </ClientOnly>
  </div>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const token = 'eyJ2aWV3IjoiYm9hcmQiLCJib2FyZFN0YXR1c2VzIjpbInRyaWFnZSIsImJhY2tsb2ciLCJ0b2RvIiwiaW5fcHJvZ3Jlc3MiLCJpbl9yZXZpZXciLCJkb25lIl0sImJvYXJkTGlua2VkUHJzIjp0cnVlLCJsaXN0R3JvdXAiOiJzdGF0dXMiLCJsaXN0T3JkZXIiOiJjcmVhdGVkX2F0IiwidGltZWxpbmVab29tIjoibW9udGgiLCJ0aW1lbGluZU9yZGVyIjoic3RhdGUiLCJ0aW1lbGluZURpc3BsYXkiOiJhbGxfbWlsZXN0b25lcyIsImZpbHRlcnMiOnt9LCJvd25lciI6InNob3RseSIsIm5hbWUiOiJzaG90bHkifQ'
const src = `https://volta.net/embed/${token}?theme=${colorMode.preference}`
</script>

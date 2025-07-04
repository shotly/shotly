<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
definePageMeta({
  middleware: 'only-admin',
})
</script>

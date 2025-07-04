<template>
  <NuxtPage />
</template>

<script lang="ts" setup>
definePageMeta({
  redirect: { name: 'admin-console' },
  middleware: 'only-admin',
})
</script>

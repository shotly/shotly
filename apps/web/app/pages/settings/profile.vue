<template>
  <UContainer>
    <div class="flex flex-col gap-6">
      <ProfileFormDetails />
      <ProfileFormDangerZone />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
useSeoMeta({
  title: () => $t('settings.profile.title'),
})
</script>

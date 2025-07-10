<template>
  <UContainer>
    <PageHeader
      :title="$t('settings.profile.title')"
      :description="$t('settings.profile.description')"
      class="mb-6"
    />

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

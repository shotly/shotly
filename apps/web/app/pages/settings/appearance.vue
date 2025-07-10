<template>
  <UContainer>
    <PageHeader
      :title="$t('settings.appearance.title')"
      :description="$t('settings.appearance.description')"
      :help="$t('settings.appearance.advancedDescription')"
      class="mb-6"
    />

    <div class="flex flex-col gap-6">
      <AppearanceFormTheme />
      <AppearanceFormLocale />
    </div>
  </UContainer>
</template>

<script setup lang="ts">
useSeoMeta({
  title: () => $t('settings.appearance.title'),
})
</script>

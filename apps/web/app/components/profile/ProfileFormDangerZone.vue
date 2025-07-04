<template>
  <PageCard class="bg-gradient-to-tl from-error/10 from-5% to-default">
    <PageHeader
      :title="$t('settings.profile.dangerZone.title')"
      :description="$t('settings.profile.dangerZone.description')"
    />

    <template #footer-right>
      <UButton :label="$t('settings.profile.dangerZone.deleteAccount')" color="error" />
    </template>
  </PageCard>
</template>

<script setup lang="ts">

</script>

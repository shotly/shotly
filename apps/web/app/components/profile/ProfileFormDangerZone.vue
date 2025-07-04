<template>
  <PageCard class="bg-gradient-to-tl from-error/10 from-5% to-default">
    <PageHeader
      :title="$t('profile.dangerZone.title')"
      :description="$t('profile.dangerZone.description')"
    />

    <template #footer-right>
      <UButton :label="$t('form.actions.delete')" color="error" />
    </template>
  </PageCard>
</template>

<script setup lang="ts">

</script>

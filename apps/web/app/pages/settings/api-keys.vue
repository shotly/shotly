<template>
  <UContainer>
    <PageHeader
      :title="$t('settings.apiKeys.title')"
      :description="$t('settings.apiKeys.description')"
      class="mb-6"
    />

    <ApiKeysFormCreate @created="openViewModal" />
  </UContainer>
</template>

<script setup lang="ts">
import { LazyApiKeysViewModal } from '#components'

useSeoMeta({
  title: () => $t('settings.apiKeys.title'),
})

const overlay = useOverlay()
const viewKeyModal = overlay.create(LazyApiKeysViewModal)

function openViewModal(apiKey: string) {
  viewKeyModal.open({ apiKey })
}
</script>

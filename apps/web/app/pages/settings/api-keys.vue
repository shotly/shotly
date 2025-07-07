<template>
  <UContainer>
    <PageHeader
      :title="$t('settings.apiKeys.title')"
      :description="$t('settings.apiKeys.description')"
      class="mb-6"
    />

    <ApiKeysFormCreate class="mb-6" @created="openViewModal" />
    <ApiKeysList ref="apiKeysList" />
  </UContainer>
</template>

<script setup lang="ts">
import { LazyApiKeysViewModal } from '#components'

useSeoMeta({
  title: () => $t('settings.apiKeys.title'),
})

const overlay = useOverlay()
const apiKeysList = useTemplateRef('apiKeysList')
const viewKeyModal = overlay.create(LazyApiKeysViewModal)

function openViewModal(apiKey: string) {
  viewKeyModal.open({ apiKey })
  apiKeysList.value?.refresh()
}
</script>

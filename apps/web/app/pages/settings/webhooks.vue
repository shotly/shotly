<template>
  <UContainer>
    <PageHeader
      :title="$t('settings.webhooks.title')"
      :description="$t('settings.webhooks.description')"
      class="mb-6"
    />

    <WebhooksFormCreate class="mb-6" @created="openViewModal" />
    <WebhooksList ref="webhooksList" />
  </UContainer>
</template>

<script setup lang="ts">
import { LazyWebhooksViewModal } from '#components'

useSeoMeta({
  title: () => $t('settings.webhooks.title'),
})

const overlay = useOverlay()
const webhooksList = useTemplateRef('webhooksList')
const viewKeyModal = overlay.create(LazyWebhooksViewModal)

function openViewModal(secret: string) {
  viewKeyModal.open({ secret })
  webhooksList.value?.refresh()
}
</script>

<template>
  <UModal
    :title="$t('settings.webhooks.createdTitle')"
    :ui="{
      content: 'divide-y-0 dark:ring-accented/80',
      description: 'text-default mt-2',
      body: 'sm:py-2 text-sm',
      footer: 'justify-end bg-elevated/50 border-t border-default mt-4',
    }"
  >
    <template #description>
      <I18nT
        keypath="settings.webhooks.createdDescription"
        scope="global"
        tag="p"
        class="text-sm"
      >
        <template #requestHeader>
          <code class="font-bold font-mono">x-shotly-signature</code>
        </template>
      </I18nT>
    </template>

    <template #body>
      <UInput
        :model-value="secret"
        readonly
        class="w-full"
      >
        <template #trailing>
          <ButtonCopy :copy-value="secret" />
        </template>
      </UInput>
    </template>

    <template #footer>
      <UButton :label="$t('common.actions.done')" @click="emit('close')" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
export interface WebhooksViewModalProps {
  secret: string
}

export interface WebhooksViewModalEmits {
  close: []
}

defineProps<WebhooksViewModalProps>()
const emit = defineEmits<WebhooksViewModalEmits>()
</script>

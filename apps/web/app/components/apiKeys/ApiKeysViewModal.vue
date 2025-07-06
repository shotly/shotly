<template>
  <UModal
    :title="$t('settings.apiKeys.createdTitle')"
    :description="$t('settings.apiKeys.createdDescription')"
    :ui="{
      content: 'divide-y-0',
      description: 'text-default',
      body: 'sm:py-4 text-sm',
      footer: 'justify-end bg-elevated/50 border-t border-default mt-4',
    }"
  >
    <template #body>
      <UInput
        :model-value="apiKey"
        readonly
        class="w-full"
      >
        <template #trailing>
          <ButtonCopy :copy-value="apiKey" />
        </template>
      </UInput>
    </template>

    <template #footer>
      <UButton :label="$t('common.actions.done')" @click="emit('close')" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
export interface ApiKeysViewModalProps {
  apiKey: string
}

export interface ApiKeysViewModalEmits {
  close: []
}

defineProps<ApiKeysViewModalProps>()
const emit = defineEmits<ApiKeysViewModalEmits>()
</script>

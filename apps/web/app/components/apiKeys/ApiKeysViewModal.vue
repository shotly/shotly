<template>
  <ModalBrand
    :title="$t('settings.apiKeys.createdTitle')"
    :description="$t('settings.apiKeys.createdDescription')"
  >
    <template #body>
      <div class="space-y-6">
        <UFormField :label="$t('common.fields.apiKey')">
          <UInput
            :model-value="apiKey"
            readonly
            class="w-full"
          >
            <template #trailing>
              <ButtonCopy :copy-value="apiKey" />
            </template>
          </UInput>
        </UFormField>

        <UButton
          class="w-full justify-center"
          :label="$t('common.actions.done')"
          @click="emit('close')"
        />
      </div>
    </template>
  </ModalBrand>
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

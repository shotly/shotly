<template>
  <ModalBrand
    :title="$t('settings.webhooks.createdTitle')"
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
      <div class="space-y-6">
        <UFormField :label="$t('common.fields.secret')">
          <UInput
            :model-value="secret"
            readonly
            class="w-full"
          >
            <template #trailing>
              <ButtonCopy :copy-value="secret" />
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
export interface WebhooksViewModalProps {
  secret: string
}

export interface WebhooksViewModalEmits {
  close: []
}

defineProps<WebhooksViewModalProps>()
const emit = defineEmits<WebhooksViewModalEmits>()
</script>

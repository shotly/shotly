<template>
  <ModalBrand
    :title="$t('collections.share.title')"
    :description="$t('collections.share.description')"
  >
    <template #body>
      <div class="space-y-6">
        <div class="flex items-center justify-between gap-4">
          <div class="text-sm">
            <div class="font-medium text-default">
              {{ $t('collections.share.controlTitle') }}
            </div>
            <div class="text-muted text-xs text-balance">
              {{ $t('collections.share.controlDescription') }}
            </div>
          </div>
          <USwitch
            v-model="isShared"
            :loading="status === 'pending'"
            @update:model-value="handleShare"
          />
        </div>
        <template v-if="isShared && (status === 'idle' || status === 'success')">
          <UFormField :label="$t('collections.share.shareUrl')">
            <UInput
              model-value="https://shotly.com/collections/123"
              readonly
              class="w-full"
            >
              <template #trailing>
                <ButtonCopy copy-value="https://shotly.com/collections/123" />
              </template>
            </UInput>
          </UFormField>
          <UFormField :label="$t('collections.share.rssUrl')">
            <UInput
              model-value="https://shotly.com/collections/123"
              readonly
              class="w-full"
            >
              <template #trailing>
                <ButtonCopy copy-value="https://shotly.com/collections/123" />
              </template>
            </UInput>
          </UFormField>
        </template>

        <UButton
          class="w-full justify-center"
          :label="$t('common.actions.done')"
          @click="$emit('close')"
        />
      </div>
    </template>
  </ModalBrand>
</template>

<script setup lang="ts">
import type { CUID } from '#shared/api'

export interface CollectionsShareModalProps {
  id: CUID
  isShared: boolean
}

export interface CollectionsShareModalEmits {
  success: []
  close: []
}

const props = defineProps<CollectionsShareModalProps>()
const emit = defineEmits<CollectionsShareModalEmits>()

const { $api } = useNuxtApp()
const isShared = ref(props.isShared)

const { execute: handleShare, status, reset } = useAsyncHandler(async (value: boolean) => {
  return $api(`/api/collections/${props.id}/share`, {
    method: 'PUT',
    body: { isShared: value },
    onResponse: ({ response }) => {
      if (!response.ok) {
        isShared.value = !isShared.value
        reset()
        return
      }

      emit('success')
    },
  })
})
</script>

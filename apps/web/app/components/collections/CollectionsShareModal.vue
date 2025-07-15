<template>
  <ModalBrand
    :title="$t('collections.share.title')"
    :description="$t('collections.share.description')"
    icon="lucide:globe"
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
              :model-value="links.share"
              readonly
              class="w-full"
            >
              <template #trailing>
                <ButtonCopy :copy-value="links.share" />
              </template>
            </UInput>
          </UFormField>
          <UFormField :label="$t('collections.share.rssUrl')">
            <UInput
              :model-value="links.rss"
              readonly
              class="w-full"
            >
              <template #trailing>
                <ButtonCopy :copy-value="links.rss" />
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
const runtimeConfig = useRuntimeConfig()

const isShared = ref(props.isShared)
const links = computed(() => ({
  share: `${runtimeConfig.public.siteUrl}/share/${props.id}`,
  rss: `${runtimeConfig.public.siteUrl}/rss/${props.id}`,
}))

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

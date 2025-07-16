<template>
  <UModal
    :title="title"
    :description="message"
    :ui="{
      content: 'divide-y-0',
      body: ['text-sm', confirmText ? 'py-4!' : 'py-0!'],
      footer: 'justify-end',
    }"
  >
    <template #body>
      <UForm
        v-if="confirmText"
        id="confirm-form"
        ref="form"
        class="pt-3"
        :state="state"
        @submit="handleConfirmClick()"
      >
        <UFormField name="confirmTextValue">
          <template #label>
            <I18nT keypath="common.confirmation.confirmText" :params="{ confirmText }" scope="global">
              <template #confirmText>
                <strong class="text-highlighted">{{ confirmText }}</strong>
              </template>
            </I18nT>
          </template>

          <UInput
            v-model="state.confirmTextValue"
            class="w-full"
            :placeholder="$t('common.placeholders.confirmText')"
          />
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton
        color="neutral"
        :label="$t('common.actions.cancel')"
        variant="ghost"
        size="lg"
        @click="emit('close')"
      />

      <UButton
        v-if="confirmText"
        form="confirm-form"
        :label="$t('common.actions.confirm')"
        type="submit"
        :disabled="state.confirmTextValue !== confirmText"
        :loading="form?.loading"
        v-bind="confirmButton"
      />
      <UButton
        v-else
        :label="$t('common.actions.confirm')"
        loading-auto
        v-bind="confirmButton"
        @click="handleConfirmClick()"
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'
import { logger } from '#shared/logger'

export interface Props {
  title?: string
  message: string
  confirmText?: string
  confirmButton?: ButtonProps
  onConfirm?: () => Promise<any> | any
}

export interface Emits {
  confirm: []
  close: []
}

const props = defineProps<Props>()
const emit = defineEmits<Emits>()

const form = useTemplateRef('form')

const state = reactive({
  confirmTextValue: '',
})

async function handleConfirmClick() {
  try {
    await props.onConfirm?.()
    emit('close')
  } catch (error) {
    logger.error(error)
  }
}
</script>

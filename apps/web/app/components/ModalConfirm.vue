<template>
  <UModal
    :title="title"
    :ui="{
      content: 'divide-y-0',
      body: 'py-0! text-sm',
      description: 'hidden',
    }"
  >
    <template #description />
    <template #body>
      {{ message }}

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
            <I18nT keypath="common.confirmation.confirmText" :params="{ confirmText }">
              <template #confirmText>
                <strong class="text-highlighted">{{ confirmText }}</strong>
              </template>
            </I18nT>
          </template>

          <UInput v-model="state.confirmTextValue" class="w-full" />
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
        size="lg"
        :disabled="state.confirmTextValue !== confirmText"
        :loading="form?.loading"
        v-bind="confirmButton"
      />
      <UButton
        v-else
        :label="$t('common.actions.confirm')"
        size="lg"
        loading-auto
        v-bind="confirmButton"
        @click="handleConfirmClick()"
      />
    </template>
  </UModal>
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

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
  await props.onConfirm?.()
  emit('close')
}
</script>

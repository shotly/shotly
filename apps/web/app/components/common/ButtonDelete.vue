<template>
  <UTooltip
    :text="tooltipText"
    :content="{ side: 'top' }"
    :disabled="!tooltipText"
    disable-hoverable-content
    disable-closing-trigger
  >
    <UButton
      v-bind="buttonProps"
      color="error"
      auto-loading
      @click="handleDeleteClick()"
    />
  </UTooltip>
</template>

<script lang="ts" setup>
import type { ButtonProps, ModalProps } from '@nuxt/ui'
import type { ComponentProps } from 'vue-component-type-helpers'
import type {
  Emits as ModalConfirmEmits,
  Props as ModalConfirmProps,
} from './ModalConfirm.vue'
import { ModalConfirm } from '#components'

export interface Props extends Pick<ModalConfirmProps, 'onConfirm'> {
  modalProps?: Omit<ModalProps & ComponentProps<typeof ModalConfirm>, 'title' | 'message' | 'onConfirm' | 'confirmButton'>
  buttonProps?: Omit<ButtonProps, 'color'>
  confirmText?: string
  title?: string
  message?: string
  tooltipText?: string
}

export interface Emits extends ModalConfirmEmits {}

const props = defineProps<Props>()
defineEmits<Emits>()

const modal = useOverlay().create(ModalConfirm)

function handleDeleteClick() {
  return modal.open({
    ...props.modalProps,
    title: props.title ?? $t('common.deletion.title'),
    message: props.message ?? $t('common.deletion.message'),
    confirmButton: { color: 'error', label: $t('common.actions.delete') },
    confirmText: props.confirmText,
    onConfirm: props.onConfirm,
  })
}
</script>

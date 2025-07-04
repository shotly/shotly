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
    title: props.title ?? 'Удаление',
    message: props.message ?? 'Вы действительно хотите удалить?',
    confirmButton: { color: 'error', label: 'Удалить' },
    confirmText: props.confirmText,
    onConfirm: props.onConfirm,
  })
}
</script>

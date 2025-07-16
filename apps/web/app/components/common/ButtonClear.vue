<template>
  <UButton
    :class="ui.base({ class: [props.ui?.base, props.class] })"
    :color="color"
    :variant="variant"
    :size="size"
    :icon="icon"
    :aria-label="label"
    :disabled="!modelValue"
    @click.stop="emit('update:modelValue', resetValue)"
  />
</template>

<script lang="ts">
import type { ButtonProps } from '@nuxt/ui'
import type { ComponentSlots } from '../../types/tv'
import { tv } from 'tailwind-variants'

export type ResetValue = string | number | boolean | null | undefined

const buttonClear = tv({
  slots: {
    base: 'p-0',
  },
})

export interface ButtonClearProps {
  icon?: string
  label?: string
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
  resetValue?: ResetValue
  class?: any
  ui?: ComponentSlots<typeof buttonClear>
}

export interface ButtonClearEmits {
  'update:modelValue': [ResetValue]
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<ButtonClearProps>(), {
  label: 'Очистить значение',
  color: 'neutral',
  variant: 'link',
  size: 'sm',
  icon: 'lucide:x',
  resetValue: undefined,
})
const emit = defineEmits<ButtonClearEmits>()
const modelValue = defineModel<ResetValue>()

const ui = computed(() => buttonClear())
</script>

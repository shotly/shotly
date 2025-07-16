<template>
  <UInput
    :model-value="(modelValue as any)"
    @update:model-value="$emit('update:modelValue', $event as any)"
  >
    <template v-if="modelValue" #trailing>
      <ButtonClear
        :model-value="(modelValue as any)"
        :reset-value="resetValue"
        @update:model-value="$emit('update:modelValue', $event as any)"
      />
    </template>
  </UInput>
</template>

<script setup lang="ts">
import type { ResetValue } from './ButtonClear.vue'

export interface InputClearableProps {
  modelValue?: string | number | null
  resetValue?: ResetValue
}

interface InputClearableEmits {
  'update:modelValue': [value: string | number | null]
}

defineProps<InputClearableProps>()
defineEmits<InputClearableEmits>()
</script>

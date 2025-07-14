<template>
  <USelectMenu
    :model-value="(modelValue as any)"
    :multiple="multiple"
    :placeholder="placeholder"
    :reset-value="resetValue"
    :value-key="valueKey as any"
    :label-key="labelKey as any"
    :items="items"
    @update:model-value="emit('update:modelValue', $event as any)"
  >
    <template v-if="!multiple && modelValue" #trailing>
      <ButtonClear
        :model-value="(modelValue as any)"
        :reset-value="resetValue"
        @update:model-value="$emit('update:modelValue', $event as any)"
      />
    </template>
  </USelectMenu>
</template>

<script lang="ts" setup generic="T extends object, M extends boolean = false">
import type { ResetValue } from './ButtonClear.vue'

interface SelectMenuClearableProps<T extends object, M extends boolean = false> {
  modelValue: M extends true ? (string | number)[] : string | number | null
  multiple?: M
  placeholder?: string
  resetValue?: ResetValue
  valueKey?: keyof T
  labelKey?: keyof T
  items?: T[]
}

interface SelectMenuClearableEmits<M extends boolean = false> {
  'update:modelValue': [value: M extends true ? (string | number)[] : string | number | null]
}

withDefaults(defineProps<SelectMenuClearableProps<T, M>>(), {
  items: () => [],
})

const emit = defineEmits<SelectMenuClearableEmits<M>>()
</script>

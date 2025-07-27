<template>
  <div class="flex items-center flex-wrap gap-1.5">
    <UButton
      v-for="item in items"
      :key="item.value"
      :label="item.label"
      :variant="selectedMap[item.value] ? 'subtle' : 'outline'"
      size="xs"
      color="neutral"
      @click="handleSelect(item.value)"
    />
  </div>
</template>

<script setup lang="ts" generic="T extends string | number">
export interface ToggleListItem<T> {
  label: string
  value: T
}

export interface ToggleListProps<T> {
  items: ToggleListItem<T>[]
}

defineProps<ToggleListProps<T>>()
const modelValue = defineModel<T[]>({ default: () => [] })
const selectedMap = computed(() => {
  return (modelValue.value ?? []).reduce((acc, value) => {
    acc[value] = true
    return acc
  }, {} as Record<T, boolean>)
})

function handleSelect(value: T) {
  if (modelValue.value.includes(value)) {
    modelValue.value = modelValue.value.filter((v) => v !== value)
  } else {
    modelValue.value = [...modelValue.value, value]
  }
}
</script>

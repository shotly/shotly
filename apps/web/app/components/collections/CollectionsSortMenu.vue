<template>
  <VueDraggable
    v-model="items"
    tag="ul"
    class="relative"
    group="collections"
    ghost-class="collection-ghost"
    handle=".collection-handle"
    :animation="150"
    @update:model-value="updateModelValue()"
  >
    <li v-for="item in items" :key="item.id">
      <div class="group w-full flex items-center gap-1.5 font-medium text-sm flex-row px-2.5 py-2 text-muted transition-colors">
        <UIcon name="lucide:grip-horizontal" class="size-5 shrink-0 cursor-grab collection-handle" />
        <span class="truncate w-full flex items-center">{{ item.name }}</span>
      </div>

      <CollectionsSortMenu
        v-model="item.children"
        :level="props.level + 1"
        class="ms-6.5"
        @update:model-value="updateModelValue()"
      />
    </li>
  </VueDraggable>
</template>

<script setup lang="ts">
import type { CollectionsListItem } from '#shared/api'
import { VueDraggable } from 'vue-draggable-plus'

export interface CollectionsSortMenuProps {
  modelValue: CollectionsListItem[]
  level?: number
}

export interface CollectionsSortMenuEmits {
  'update:modelValue': [value: CollectionsListItem[]]
}

const props = withDefaults(defineProps<CollectionsSortMenuProps>(), {
  level: 0,
})
const emit = defineEmits<CollectionsSortMenuEmits>()

const updateModelValue = inject('updateModelValue', () => {})

const items = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  },
})

if (props.level === 0) {
  let isUpdating = false
  provide('updateModelValue', () => {
    if (isUpdating) {
      return
    }

    isUpdating = true
    items.value = [...items.value]
    nextTick(() => isUpdating = false)
  })
}
</script>

<style>
.collection-ghost {
  background-color: var(--ui-bg-elevated);
  /* background-color: var(--ui-bg-inverted); */
  border-radius: calc(var(--ui-radius) * 1.5);
}
</style>

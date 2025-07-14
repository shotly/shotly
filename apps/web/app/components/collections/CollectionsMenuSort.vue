<template>
  <VueDraggable
    v-model="items"
    tag="ul"
    class="relative"
    group="collections"
    ghost-class="collection-ghost"
    handle=".collection-handle"
    :animation="150"
    :data-has-children="level > 0 ? 'true' : undefined"
    @move="handleMove"
  >
    <li v-for="item in items" :key="item.id">
      <div class="group w-full flex items-center gap-1.5 font-medium text-sm flex-row px-2.5 py-2 text-muted transition-colors">
        <UIcon name="lucide:grip-horizontal" class="size-5 shrink-0 cursor-grab collection-handle" />
        <span class="truncate w-full flex items-center">{{ item.name }}</span>
      </div>

      <CollectionsMenuSort
        v-if="level + 1 < 2"
        v-model="item.children"
        :level="level + 1"
        class="ms-6.5"
      />
    </li>
  </VueDraggable>
</template>

<script setup lang="ts">
/**
 * There is a problem with model updates in this component.
 * When moving an item, emit('update:modelValue') is called multiple times for parent elements.
 * For the current functionality, where we only allow creating collections at one level, this is not critical.
 * But in the future, if we add the ability to create collections at multiple levels, this will be a problem.
 */
import type { CollectionsListItem } from '#shared/api'
import type { MoveEvent } from 'sortablejs'
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

const items = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})

function handleMove(event: MoveEvent) {
  /**
   * If the target has children and the data has children, return false.
   * This is to prevent the user from moving a collection into a collection that has children.
   */
  if (event.to.dataset.hasChildren && (event as MoveEvent & { data: CollectionsListItem }).data.children.length > 0) {
    return false
  }
}
</script>

<style>
.collection-ghost {
  background-color: var(--ui-bg-elevated);
  border-radius: calc(var(--ui-radius) * 1.5);
}
</style>

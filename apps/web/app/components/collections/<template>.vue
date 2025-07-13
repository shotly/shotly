<template>
  <DefineItemTemplate v-slot="{ item, level = 0 }">
    <li class="">
      <div class="group w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md flex-row px-2.5 before:inset-y-px before:inset-x-0 py-2 hover:text-highlighted hover:before:bg-elevated/50 text-muted transition-colors before:transition-colors">
        <UIcon :name="item.icon" class="shrink-0 size-5 group-hover:text-default text-dimmed transition-colors" />
        <span class="truncate w-full flex items-center">{{ item.name }} ({{ level }})</span>
        <UIcon name="lucide:grip-horizontal" class="size-4 shrink-0 cursor-grab collection-handle" />
      </div>

      <VueDraggable
        v-model="item.children"
        tag="ul"
        class="ms-6.5 relative min-h-0"
        group="collections"
        ghost-class="collection-ghost"
        :animation="150"
        @end="handleSortEnd"
      >
        <ReuseItemTemplate
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :level="level + 1"
        />
      </VueDraggable>
    </li>
  </DefineItemTemplate>

  <nav v-if="modelValue" class="flex flex-col gap-1.5">
    <VueDraggable
      v-model="modelValue"
      tag="ul"
      class="relative min-h-2"
      group="collections"
      ghost-class="collection-ghost"
      :animation="150"
      @end="handleSortEnd"
    >
      <ReuseItemTemplate
        v-for="item in modelValue"
        :key="item.id"
        :item="item"
      />
    </VueDraggable>
  </nav>
</template>

<script setup lang="ts">
//
import type { CollectionsListItem } from '#shared/api'
import { VueDraggable } from 'vue-draggable-plus'

defineOptions({ inheritAttrs: false })

const _modelValue = defineModel<CollectionsListItem[]>('items', {
  default: () => [],
})

const modelValue = ref(_modelValue.value)

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: CollectionsListItem, level?: number }>({
  props: {
    item: Object as PropType<CollectionsListItem>,
    level: Number as PropType<number>,
  },
})

function handleSortEnd(event: any) {
  console.warn(event)
}
</script>

<style>
.collection-ghost {
  background-color: var(--ui-bg-elevated);
  /* background-color: var(--ui-bg-inverted); */
  border-radius: calc(var(--ui-radius) * 1.5);
}
</style>

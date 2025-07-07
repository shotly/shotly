<template>
  <UPopover v-if="sortingColumns.length > 0">
    <UChip :ui="{ base: 'z-1 size-3' }" :show="model.length > 0" size="xl">
      <UButton
        icon="lucide:arrow-up-down"
        variant="outline"
        color="neutral"
        :label="$t('common.sorting.title')"
      />
    </UChip>

    <template #content>
      <div class="flex flex-col gap-2 p-3">
        <URadioGroup
          :model-value="model[0]?.id"
          :items="sortingColumns"
          @update:model-value="updateModel({ id: $event, desc: model[0]?.desc ?? false })"
        />

        <USeparator />

        <UButton
          v-for="item in sortOrder"
          :key="item.icon"
          :icon="item.icon"
          :label="item.label"
          :disabled="!model[0]"
          :variant="item.desc === (model[0]?.desc ?? false) ? 'soft' : 'ghost'"
          size="sm"
          @click="updateModel({ id: model[0]?.id ?? '', desc: item.desc })"
        />
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
import type { ButtonProps, RadioGroupItem } from '@nuxt/ui'
import type { ColumnSort, SortingState, Table } from '@tanstack/vue-table'

export interface Props {
  table?: Table<any>
}

export type Model = SortingState

const props = defineProps<Props>()
const model = defineModel<Model>({ default: [] })

const sortingColumns = computed<RadioGroupItem[]>(() => {
  if (!props.table) {
    return []
  }

  return props.table.getAllColumns().filter((column) => column.columnDef.enableSorting).map((column) => ({
    label: typeof column.columnDef.header === 'string' ? column.columnDef.header : column.columnDef.id,
    value: column.id,
  }))
})

const sortOrder = computed(() => [
  { icon: 'lucide:arrow-up-narrow-wide', label: $t('common.sorting.asc'), desc: false },
  { icon: 'lucide:arrow-down-narrow-wide', label: $t('common.sorting.desc'), desc: true },
] satisfies Array<ButtonProps & Pick<ColumnSort, 'desc'>>)

function updateModel(value: ColumnSort) {
  model.value = [value]
}
</script>

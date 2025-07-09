<template>
  <UDropdownMenu :items="items">
    <UChip
      :ui="{ base: 'z-1 size-3' }"
      :show="hiddenColumnsCount > 0"
      :text="hiddenColumnsCount"
      size="xl"
    >
      <UButton
        icon="lucide:columns-3-cog"
        variant="outline"
        color="neutral"
        :label="$t('common.table.columns')"
      />
    </UChip>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'
import type { Table, VisibilityState } from '@tanstack/vue-table'

export interface Props {
  table?: Table<any>
}
export type Model = VisibilityState

const props = defineProps<Props>()
const visibility = defineModel<Model>({ default: {} })

const items = computed<DropdownMenuItem[]>(() => {
  if (!props.table) {
    return []
  }

  return props.table.getAllColumns().filter((column) => column.getCanHide()).map((column) => ({
    label: typeof column.columnDef.header === 'string' ? column.columnDef.header : column.columnDef.id,
    type: 'checkbox',
    checked: column.getIsVisible(),
    onUpdateChecked: (checked) => visibility.value = { ...visibility.value, [column.id]: checked },
    onSelect: (event) => event.preventDefault(),
  }))
})

const hiddenColumnsCount = computed<number>(() => {
  return items.value.reduce((sum, item) => item.checked ? sum : sum + 1, 0)
})
</script>

<template>
  <div>
    <div v-if="$slots['header-left'] || $slots['header-right'] || props.columnVisibility || sorting" class="flex justify-between items-center gap-2 mb-4">
      <div>
        <slot name="header-left" />
      </div>
      <div class="flex items-center gap-2">
        <slot name="header-right" />

        <DataTableColumnSorting
          :model-value="sorting"
          :table="tableRef?.tableApi"
          @update:model-value="emit('update:sorting', $event!)"
        />
        <DataTableColumnVisibility
          v-if="props.columnVisibility"
          v-model="columnVisibility"
          :table="tableRef?.tableApi"
        />
      </div>
    </div>
    <UTable
      ref="table"
      v-model:column-visibility="columnVisibility"
      :class="ui.table({ class: props.ui?.table })"
      :column-pinning="columnPinning"
      :columns="tableColumns"
      :data="data"
      :sorting-options="{ manualSorting: hasPagination }"
      :sticky="sticky"
      :loading="loading"
    >
      <template v-for="(_, name) in tableProxySlots" #[name]="slotData: any">
        <slot :name="name" v-bind="slotData" />
      </template>
    </UTable>
    <div v-if="hasPagination" class="flex justify-between items-center mt-4">
      <div>
        <span class="text-sm text-muted">
          {{ $t('common.table.total') }}: {{ total ?? 0 }}
        </span>
      </div>
      <div class="flex items-center gap-2">
        <span class="text-sm text-muted">
          {{ $t('common.table.rowsPerPage') }}:
        </span>
        <USelect
          :model-value="paginationProps.itemsPerPage"
          :items="itemsPerPageList"
          class="w-18"
          @update:model-value="emit('update:itemsPerPage', Number($event))"
        />
        <UPagination
          v-bind="paginationProps"
          :sibling-count="1"
          variant="ghost"
          active-color="neutral"
          show-edges
          @update:page="emit('update:page', $event)"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts" generic="T">
import type { DropdownMenuItem, TableProps, TableRow, TableSlots } from '@nuxt/ui'
import type { ColumnPinningState } from '@tanstack/vue-table'
import type { ComponentSlots } from '../types/tv'
import type { Model as ColumnSortModel } from './DataTableColumnSorting.vue'
import type { Model as ColumnVisibilityModel } from './DataTableColumnVisibility.vue'
import { UButton, UDropdownMenu } from '#components'
import { objectOmit } from '@vueuse/core'
import { useForwardProps } from 'reka-ui'
import { tv } from 'tailwind-variants'

const dataTable = tv({
  slots: {
    table: '',
  },
  variants: {
    variant: {
      outline: {
        table: 'bg-default ring ring-default rounded-lg',
      },
      ghost: {
        table: '',
      },
    },
  },
})

export interface Props<T> {
  page?: number
  itemsPerPage?: number
  total?: number
  data?: T[]
  columns?: TableProps<T>['columns']
  sticky?: boolean
  columnPinning?: ColumnPinningState
  columnVisibility?: boolean
  defaultHiddenColumns?: string[]
  sorting?: ColumnSortModel
  loading?: boolean
  actions?: (row: T) => DropdownMenuItem[]
  ui?: ComponentSlots<typeof dataTable>
  variant?: 'outline' | 'ghost'
}

export interface Emits {
  'update:sorting': [value: ColumnSortModel]
  'update:page': [value: number]
  'update:itemsPerPage': [value: number]
}

export type Slots<T> = Omit<TableSlots<T>, 'header-left' | 'header-right'> & {
  'header-left': () => any
  'header-right': () => any
}
</script>

<script lang="ts" setup generic="T">
const props = withDefaults(defineProps<Props<T>>(), {
  columnVisibility: true,
  sticky: true,
  defaultHiddenColumns: () => [],
  variant: 'outline',
})
const emit = defineEmits<Emits>()
const slots = defineSlots<Slots<T>>()

const tableColumns = computed(() => [
  ...(props.columns ?? []),
  ...(props.actions
    ? [{
        id: 'actions',
        meta: { class: { td: 'w-20' } },
        enableHiding: false,
        cell: ({ row }: { row: TableRow<T> }) => h(
          'div',
          { class: 'text-right' },
          h(
            UDropdownMenu as any,
            {
              content: { align: 'end' },
              items: props.actions?.(row.original) ?? [],
            },
            () => h(UButton, {
              icon: 'lucide:ellipsis-vertical',
              color: 'neutral',
              variant: 'ghost',
              class: 'ml-auto',
            }),
          ),
        ),
      }]
    : []),
])
const paginationProps = useForwardProps(reactivePick(props, 'page', 'itemsPerPage', 'total'))
const tableProxySlots = objectOmit(slots, ['header-left', 'header-right'])

const tableRef = useTemplateRef('table')

const initialVisibilityState = Object.fromEntries(props.defaultHiddenColumns.map((column) => [column, false]))
const columnVisibility = ref<ColumnVisibilityModel>(initialVisibilityState)
const hasPagination = computed<boolean>(() => props.page !== undefined)

const itemsPerPageList = [10, 20, 50, 100]

const ui = computed(() => {
  return dataTable({
    variant: props.variant,
  })
})
</script>

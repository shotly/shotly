<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.loading" :class="ui.loading({ class: props.ui?.loading })">
      <div :class="ui.content({ class: props.ui?.content })">
        <div v-for="item in 2" :key="item" :class="ui.item({ class: props.ui?.item })">
          <slot name="loading" :item="item" />
        </div>
      </div>
    </div>
    <template v-else>
      <div v-if="props.items?.length" :class="ui.content({ class: props.ui?.content })">
        <div v-for="(item, key) in props.items" :key="key" :class="ui.item({ class: props.ui?.item })">
          <slot name="item" :item="item" />
        </div>
      </div>
      <div v-else :class="ui.empty({ class: props.ui?.empty })">
        <slot name="empty" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" generic="T extends object">
import type { ComponentSlots } from '../../types/tv'
import { tv } from 'tailwind-variants'

const pageList = tv({
  slots: {
    root: 'relative flex rounded-lg',
    content: 'relative flex flex-col flex-1 lg:grid divide-y divide-default',
    item: 'p-4',
    empty: 'p-4 w-full',
    loading: 'w-full',
  },
  variants: {
    variant: {
      outline: {
        root: 'ring ring-default',
      },
      subtle: {
        root: 'bg-default ring ring-default',
      },
    },
  },
})

export interface PageListProps<T extends object> {
  items?: T[]
  loading?: boolean
  variant?: 'outline' | 'subtle'
  ui?: ComponentSlots<typeof pageList>
  class?: any
}

export interface PageListSlots<T extends object> {
  item: (props: { item: T }) => any
  empty: () => any
  loading: () => any
}
</script>

<script setup lang="ts" generic="T extends object">
const props = withDefaults(defineProps<PageListProps<T>>(), {
  items: () => [],
  variant: 'outline',
})
defineSlots<PageListSlots<T>>()

const ui = computed(() => pageList({
  variant: props.variant,
}))
</script>

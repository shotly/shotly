<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div v-if="props.icon" :class="ui.icon({ class: props.ui?.icon })">
      <UIcon :name="props.icon" />
    </div>
    <div :class="ui.title({ class: props.ui?.title })">
      {{ props.title }}
    </div>
    <div :class="ui.description({ class: props.ui?.description })">
      {{ props.description }}
    </div>
  </div>
</template>

<script lang="ts">
import type { ComponentSlots } from '../types/tv'
import { tv } from 'tailwind-variants'

const emptyState = tv({
  slots: {
    root: 'flex flex-col items-center justify-center gap-1 min-h-50',
    icon: 'size-12 text-xl text-muted rounded-full border border-default flex items-center justify-center mb-4',
    title: 'font-medium',
    description: 'text-muted text-sm text-pretty',
  },
})

export interface EmptyStateProps {
  title?: string
  description?: string
  icon?: string
  ui?: ComponentSlots<typeof emptyState>
  class?: any
}
</script>

<script lang="ts" setup>
const props = defineProps<EmptyStateProps>()

const ui = computed(() => emptyState())
</script>

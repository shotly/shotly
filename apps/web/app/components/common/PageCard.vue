<template>
  <div :class="ui.root({ class: [props.ui?.root, props.class] })">
    <div :class="ui.content({ class: props.ui?.content })">
      <slot />
    </div>

    <div v-if="$slots['footer-left'] || $slots['footer-right']" :class="ui.footer({ class: props.ui?.footer })">
      <div :class="ui.footerLeft({ class: props.ui?.footerLeft })">
        <slot name="footer-left" />
      </div>
      <div v-if="$slots['footer-right']" :class="ui.footerRight({ class: props.ui?.footerRight })">
        <slot name="footer-right" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { ComponentSlots } from '../types/tv'
import { tv } from 'tailwind-variants'

const pageCard = tv({
  slots: {
    root: 'relative flex flex-col rounded-lg overflow-hidden',
    content: 'flex-1',
    footer: 'flex items-center justify-between text-sm',
    footerLeft: 'flex items-center gap-2',
    footerRight: 'flex items-center gap-2',
  },
  variants: {
    variant: {
      subtle: {
        root: 'bg-default ring ring-default',
        content: 'p-4 sm:p-6',
        footer: 'px-4 py-3 sm:px-6 text-muted border-t border-default bg-elevated/50',
      },
      outline: {
        root: 'bg-default ring ring-default',
        content: 'p-4 sm:p-6',
        footer: 'px-4 py-3 sm:px-6',
      },
      ghost: {
        root: 'bg-transparent',
      },
    },
  },
})

export interface PageCardProps {
  variant?: 'outline' | 'subtle' | 'ghost'
  ui?: ComponentSlots<typeof pageCard>
  class?: any
}

export interface PageCardSlots {
  'default'?: () => any
  'footer-left'?: () => any
  'footer-right'?: () => any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<PageCardProps>(), {
  variant: 'outline',
})

defineSlots<PageCardSlots>()

const ui = computed(() => pageCard({
  variant: props.variant,
}))
</script>

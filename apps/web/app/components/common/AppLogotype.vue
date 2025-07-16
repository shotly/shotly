<template>
  <NuxtLink :to="{ name: 'index' }" :class="ui.root()">
    <UIcon name="shotly:logo" :class="ui.icon()" />
    <div :class="ui.label()">
      {{ appConfig.name }}
    </div>
  </NuxtLink>
</template>

<script lang="ts">
import type { ComponentSlots } from '../../types/tv'
import { tv } from 'tailwind-variants'

const appLogotype = tv({
  slots: {
    root: 'flex items-center gap-2 focus-visible:outline-primary',
    icon: '',
    label: 'font-semibold',
  },
  variants: {
    size: {
      sm: {
        icon: 'size-4',
        label: 'text-sm',
      },
      md: {
        icon: 'size-6',
        label: 'text-base',
      },
      lg: {
        icon: 'size-7',
        label: 'text-xl',
      },
    },
  },
})

export interface AppLogotypeProps {
  size?: 'sm' | 'md' | 'lg'
  ui?: ComponentSlots<typeof appLogotype>
  class?: any
}
</script>

<script setup lang="ts">
const props = withDefaults(defineProps<AppLogotypeProps>(), {
  size: 'md',
})

const appConfig = useAppConfig()

const ui = computed(() => appLogotype({ size: props.size }))
</script>

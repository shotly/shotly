<template>
  <NuxtLink :to="{ name: 'index' }" :class="ui.root()">
    <UIcon name="shotly:logo-symbol" :class="ui.icon()" />
    <div :class="ui.label()">
      {{ appConfig.name }}
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'

export interface AppLogotypeProps {
  size?: 'sm' | 'md' | 'lg'
}

const props = withDefaults(defineProps<AppLogotypeProps>(), {
  size: 'md',
})

const appConfig = useAppConfig()

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

const ui = computed(() => appLogotype({ size: props.size }))
</script>

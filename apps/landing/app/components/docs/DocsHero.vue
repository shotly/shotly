<template>
  <div :class="ui.root()">
    <div :class="ui.content()">
      <slot>
        <NuxtImg v-if="props.image" :src="props.image" :class="ui.image()" />
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'

export interface DocsHeroProps {
  position?: 'middle' | 'left' | 'right'
  image?: string
}

export interface DocsHeroSlots {
  default?: () => any
}

const props = withDefaults(defineProps<DocsHeroProps>(), {
  position: 'middle',
})

defineSlots<DocsHeroSlots>()

const docsHero = tv({
  slots: {
    root: 'relative aspect-video rounded-lg bg-primary-gradient not-prose',
    content: 'flex flex-col rounded-lg p-4 sm:p-6 lg:p-8 h-full',
    image: 'rounded-lg',
  },
  variants: {
    position: {
      middle: {
        root: '',
        content: 'overflow-hidden',
        image: 'w-full my-auto rounded-md',
      },
      left: {
        root: 'overflow-hidden',
        image: 'absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8',
      },
      right: {
        root: 'overflow-hidden',
        image: 'absolute top-4 left-4 sm:top-6 sm:left-6 lg:top-8 lg:left-8',
      },
    },
  },
})

const ui = computed(() => docsHero({ position: props.position }))
</script>

<template>
  <div :class="ui.root()">
    <NuxtImg v-if="props.image" :src="props.image" :class="ui.image()" />
    <UColorModeImage
      v-else-if="props.light && props.dark"
      :light="props.light"
      :dark="props.dark"
      :class="ui.image()"
    />
  </div>
</template>

<script setup lang="ts">
import { tv } from 'tailwind-variants'

export interface DocsImageProps {
  position?: 'full' | 'original'
  image?: string
  light?: string
  dark?: string
}

const props = withDefaults(defineProps<DocsImageProps>(), {
  position: 'full',
})

const docsHero = tv({
  slots: {
    root: 'relative rounded-lg bg-primary-gradient overflow-hidden p-4 sm:p-6 lg:p-8',
    image: 'rounded-lg w-full block',
  },
  variants: {
    position: {
      full: {},
      original: {
        root: 'aspect-video flex items-center justify-center',
        image: 'max-w-full w-auto',
      },
    },
  },
})

const ui = computed(() => docsHero({ position: props.position }))
</script>

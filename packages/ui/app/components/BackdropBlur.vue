<template>
  <div class="pointer-events-none absolute">
    <template v-for="pos in ['top', 'bottom'] as const" :key="pos">
      <div
        v-if="position === pos || position === 'both'"
        :class="`fixed inset-x-0 ${positions[pos].class} isolate h-24`"
        :style="{ height: `${size}px` }"
      >
        <div
          v-for="blur in blurLevels"
          :key="blur"
          :style="{
            '-webkit-backdrop-filter': `blur(${blur}px)`,
            'backdrop-filter': `blur(${blur}px)`,
            'opacity': pos === 'bottom' ? bottomOpacity : 1,
          }"
          class="absolute inset-0"
          :class="[
            positions[pos].gradient,
            `blur-[${blur}px]`,
          ]"
        />
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

interface BackdropBlurProps {
  position?: 'top' | 'bottom' | 'both'
  size?: number
}

withDefaults(defineProps<BackdropBlurProps>(), {
  position: 'top',
  size: 75,
})

const blurLevels = [1, 2, 3, 6, 12]
const bottomOpacity = ref(1)

const positions = {
  top: {
    class: 'top-0',
    gradient: 'gradient-mask-b-0',
  },
  bottom: {
    class: 'bottom-0',
    gradient: 'gradient-mask-t-0',
  },
}

function updateBottomOpacity() {
  const windowHeight = window.innerHeight
  const documentHeight = document.documentElement.scrollHeight
  const scrollTop = window.scrollY

  const distanceToBottom = documentHeight - (scrollTop + windowHeight)

  const transitionZone = 200

  if (distanceToBottom <= transitionZone) {
    bottomOpacity.value = distanceToBottom / transitionZone
  } else {
    bottomOpacity.value = 1
  }
}

onMounted(() => {
  window.addEventListener('scroll', updateBottomOpacity)
})

onUnmounted(() => {
  window.removeEventListener('scroll', updateBottomOpacity)
})
</script>

<style scoped>
.gradient-mask-b-0 {
  mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1) 0%, transparent 100%);
}
.gradient-mask-t-0 {
  mask-image: linear-gradient(to top, rgba(0, 0, 0, 1) 0%, transparent 100%);
}
</style>

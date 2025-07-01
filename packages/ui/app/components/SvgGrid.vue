<template>
  <svg
    class="pointer-events-none absolute inset-0"
    width="100%"
    height="100%"
  >
    <defs>
      <pattern
        :id="id"
        :x="patternOffset[0] - 1"
        :y="patternOffset[1] - 1"
        :width="cellSize"
        :height="cellSize"
        patternUnits="userSpaceOnUse"
      >
        <path
          :d="`M ${cellSize} 0 L 0 0 0 ${cellSize}`"
          fill="transparent"
          stroke="currentColor"
          :stroke-width="strokeWidth"
        />
      </pattern>
    </defs>
    <rect :fill="`url(#${id})`" width="100%" height="100%" />
  </svg>
</template>

<script setup lang="ts">
export interface SvgGridProps {
  cellSize?: number
  strokeWidth?: number
  patternOffset?: [number, number]
}

withDefaults(defineProps<SvgGridProps>(), {
  cellSize: 12,
  strokeWidth: 1,
  patternOffset: () => [0, 0],
})

const id = useId()
</script>

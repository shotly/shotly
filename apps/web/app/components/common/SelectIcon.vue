<template>
  <UPopover
    v-model:open="open"
    :content="{ side: 'bottom', align: 'start', sideOffset: 14 }"
    :ui="{ content: 'w-74' }"
  >
    <UIcon
      :name="modelValue"
      class="size-5 text-dimmed hover:text-default cursor-pointer transition-colors"
    />
    <template #content>
      <div
        class="grid grid-cols-6 gap-2 p-4 max-w-xs"
        @click="onIconClick"
      >
        <button
          v-for="icon in icons"
          :key="icon"
          type="button"
          :aria-label="icon"
          class="flex items-center justify-center rounded-lg aspect-square transition-colors hover:bg-elevated"
          :class="modelValue === icon ? 'bg-elevated text-default' : 'text-dimmed'"
          :data-icon="icon"
        >
          <UIcon :name="icon" class="size-5" />
        </button>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>({ default: 'lucide:folder' })

const open = ref(false)

const icons = [
  'lucide:folder', 'lucide:file', 'lucide:bookmark', 'lucide:shopping-cart',
  'lucide:heart', 'lucide:sparkles', 'lucide:search', 'lucide:send',
  'lucide:link', 'lucide:sprout', 'lucide:gamepad-2', 'lucide:paw-print',
  'lucide:circle-fading-arrow-up', 'lucide:rocket', 'lucide:map-pin', 'lucide:lock', 'lucide:users',
  'lucide:building-2', 'lucide:trash', 'lucide:calendar', 'lucide:clock',
  'lucide:bell', 'lucide:paintbrush', 'lucide:camera',
]

function onIconClick(event: MouseEvent) {
  const target = event.target as HTMLElement
  const button = target.closest('button[data-icon]') as HTMLButtonElement | null

  if (button) {
    const icon = button.getAttribute('data-icon')

    if (icon && icon !== modelValue.value) {
      modelValue.value = icon
      open.value = false
    }
  }
}
</script>

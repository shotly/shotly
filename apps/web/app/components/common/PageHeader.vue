<template>
  <div class="flex items-center justify-between">
    <div class="flex flex-col gap-1">
      <div class="flex items-center gap-2 text-xl font-medium text-highlighted">
        <slot name="title">
          <span>{{ title }}</span>
        </slot>

        <UPopover v-if="help || $slots.help" mode="hover" :content="{ side: 'right' }">
          <UIcon name="lucide:help-circle" class="text-muted size-4" />

          <template #content>
            <slot name="help">
              <p class="px-1.5 py-1 text-xs text-highlighted max-w-xs">
                {{ help }}
              </p>
            </slot>
          </template>
        </UPopover>
      </div>
      <p class="text-sm text-muted">
        <slot name="description">
          {{ description }}
        </slot>
      </p>
    </div>

    <div class="flex items-center gap-2">
      <slot name="links" />
    </div>
  </div>
</template>

<script setup lang="ts">
export interface PageHeaderProps {
  title: string
  description?: string
  help?: string
}

export interface PageHeaderSlots {
  title?: () => any
  description?: () => any
  help?: () => any
  links?: () => any
}

defineProps<PageHeaderProps>()
defineSlots<PageHeaderSlots>()
</script>

<template>
  <UModal
    v-bind="forwarded"
    :ui="{
      content: 'divide-y-0 max-w-md dark:ring-accented/50',
      body: 'bg-muted px-4 sm:px-16 sm:py-8',
      header: 'relative after:w-full after:h-px after:bg-accented dark:after:bg-accented/70 after:left-0 after:absolute after:bottom-0',
      footer: 'bg-muted px-4 sm:px-16 sm:pb-8',
    }"
  >
    <template #header>
      <div class="flex flex-col items-center justify-center space-y-3 w-full p-4 max-w-sm mx-auto">
        <UIcon name="shotly:logo" class="size-10 text-highlighted" />
        <div class="flex flex-col space-y-1 text-center">
          <DialogTitle v-if="title || !!slots.title" as="h3" class="text-lg font-medium">
            <slot name="title">
              {{ title }}
            </slot>
          </DialogTitle>

          <DialogDescription v-if="description || !!slots.description" class="text-sm text-muted">
            <slot name="description">
              {{ description }}
            </slot>
          </DialogDescription>
        </div>
      </div>
    </template>

    <template v-for="(_, name) in slots" #[name]="slotData">
      <slot :name="name" v-bind="slotData" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { ModalSlots } from '@nuxt/ui'
import { DialogDescription, DialogTitle, useForwardPropsEmits } from 'reka-ui'

export interface ModalBrandProps {
  title: string
  description?: string
}

export interface ModalBrandEmits {
  'after:leave': []
  'after:enter': []
  'close:prevent': []
  'update:open': [value: boolean]
}

export interface ModalBrandSlots extends Omit<ModalSlots, 'header'> {

}

const props = defineProps<ModalBrandProps>()
const emit = defineEmits<ModalBrandEmits>()
const slots = defineSlots<ModalBrandSlots>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

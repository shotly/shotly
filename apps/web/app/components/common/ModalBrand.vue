<template>
  <UModal
    v-bind="forwarded"
    :ui="{
      body: 'px-4 sm:px-16 sm:py-8',
      footer: 'px-4 sm:px-16 sm:pb-8',
    }"
  >
    <template #header>
      <div class="flex flex-col items-center justify-center space-y-3 w-full p-4 max-w-sm mx-auto">
        <UIcon v-if="!hideIcon" :name="icon" class="size-10 text-highlighted" />
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

    <template v-for="(_, name) in slots" #[name]="slotData: any">
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
  icon?: string
  hideIcon?: boolean
}

export interface ModalBrandEmits {
  'after:leave': []
  'after:enter': []
  'close:prevent': []
  'update:open': [value: boolean]
}

export interface ModalBrandSlots extends Omit<ModalSlots, 'header'> {

}

const props = withDefaults(defineProps<ModalBrandProps>(), {
  icon: 'shotly:logo',
})

const emit = defineEmits<ModalBrandEmits>()
const slots = defineSlots<ModalBrandSlots>()

const forwarded = useForwardPropsEmits(props, emit)
</script>

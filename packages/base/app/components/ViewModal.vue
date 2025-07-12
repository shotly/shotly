<template>
  <UModal
    v-bind="forwarded"
    :ui="{
      content: 'divide-y-0 max-w-md',
      body: 'bg-muted px-4 sm:px-16 sm:py-8',
      header: 'relative after:w-full after:h-px after:bg-accented after:left-0 after:absolute after:bottom-0',
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
import type { ModalEmits, ModalProps, ModalSlots } from '@nuxt/ui/runtime/components/Modal.vue'
import { DialogDescription, DialogTitle, useForwardPropsEmits } from 'reka-ui'

// todo: remove @vue-ignore after https://github.com/shotly/shotly/issues/55
export interface ViewModalProps extends /* @vue-ignore */ ModalProps {
  title?: string
  description?: string
}

// todo: remove @vue-ignore after https://github.com/shotly/shotly/issues/55
export interface ViewModalEmits extends /* @vue-ignore */ ModalEmits {
  'after:leave': []
  'after:enter': []
  'close:prevent': []
  'update:open': [value: boolean]
}

export interface ViewModalSlots extends Omit<ModalSlots, 'header'> {

}

const props = defineProps<ViewModalProps>()
const emits = defineEmits<ViewModalEmits>()
const slots = defineSlots<ViewModalSlots>()

const forwarded = useForwardPropsEmits(props, emits)
</script>

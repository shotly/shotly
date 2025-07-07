<template>
  <UButton
    :icon="copied ? 'lucide:check' : 'lucide:copy'"
    :color="copied ? 'success' : 'primary'"
    variant="link"
    size="sm"
    @click="handleCopy"
  />
</template>

<script lang="ts" setup>
import type { ButtonProps } from '@nuxt/ui'

export interface Props {
  copyValue: string
  // todo: replace to extend button props, but it's not working
  color?: ButtonProps['color']
  variant?: ButtonProps['variant']
  size?: ButtonProps['size']
}

const props = defineProps<Props>()
const { copy, copied } = useClipboard()

function handleCopy() {
  copy(props.copyValue)
}
</script>

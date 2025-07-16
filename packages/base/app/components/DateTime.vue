<template>
  <NuxtTime v-bind="forwardedProps" :locale="locale" />
</template>

<script setup lang="ts">
import type { NuxtTimeProps } from '#app'
import { NuxtTime } from '#components'
import { useForwardProps } from 'reka-ui'

const props = defineProps<Omit<NuxtTimeProps, 'locale'>>()

const { locale } = useI18n()
const forwardedProps = useForwardProps(props)
</script>

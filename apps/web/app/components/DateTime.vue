<template>
  <NuxtTime v-bind="forwardedProps" :locale="locale" />
</template>

<script setup lang="ts">
import { NuxtTime } from '#components'
import { useForwardProps } from 'reka-ui'

// todo: https://github.com/shotly/shotly/issues/58
export interface NuxtTimeProps {
  locale?: string
  datetime: string | number | Date
  localeMatcher?: 'best fit' | 'lookup'
  weekday?: 'long' | 'short' | 'narrow'
  era?: 'long' | 'short' | 'narrow'
  year?: 'numeric' | '2-digit'
  month?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow'
  day?: 'numeric' | '2-digit'
  hour?: 'numeric' | '2-digit'
  minute?: 'numeric' | '2-digit'
  second?: 'numeric' | '2-digit'
  timeZoneName?: 'short' | 'long' | 'shortOffset' | 'longOffset' | 'shortGeneric' | 'longGeneric'
  formatMatcher?: 'best fit' | 'basic'
  hour12?: boolean
  timeZone?: string

  calendar?: string
  dayPeriod?: 'narrow' | 'short' | 'long'
  numberingSystem?: string

  dateStyle?: 'full' | 'long' | 'medium' | 'short'
  timeStyle?: 'full' | 'long' | 'medium' | 'short'
  hourCycle?: 'h11' | 'h12' | 'h23' | 'h24'
  relative?: boolean
  title?: boolean | string
}

const props = defineProps<Omit<NuxtTimeProps, 'locale'>>()

const { locale } = useI18n()
const forwardedProps = useForwardProps(props)
</script>

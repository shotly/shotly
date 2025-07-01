<template>
  <UDropdownMenu :items="items" :ui="{ content: 'w-40' }">
    <UButton
      :icon="`lang-${locale}`"
      :ui="{ leadingIcon: 'border border-default rounded-full' }"
      variant="ghost"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { locale, locales, setLocale } = useI18n()

const items = computed<DropdownMenuItem[]>(() => locales.value.map((loc) => ({
  label: loc.name,
  icon: `lang-${loc.code}`,
  type: 'checkbox',
  checked: loc.code === locale.value,
  onSelect: (e) => {
    e.preventDefault()
    setLocale(loc.code)
  },
})))
</script>
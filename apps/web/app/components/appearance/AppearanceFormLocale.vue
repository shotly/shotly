<template>
  <PageCard variant="subtle">
    <PageHeader
      :title="$t('settings.appearance.locale.title')"
      :description="$t('settings.appearance.locale.description')"
      class="mb-6"
    />

    <USelectMenu
      :model-value="locale"
      :items="items"
      :icon="icon"
      value-key="value"
      label-key="label"
      class="w-full max-w-sm"
      @update:model-value="setLocale($event as any)"
    />

    <template #footer-left>
      <I18nT
        keypath="settings.appearance.locale.feedback"
        scope="global"
        tag="p"
        class="leading-7"
      >
        <template #link>
          <ULink inactive-class="text-secondary border-b leading-4.5">
            {{ $t('settings.appearance.locale.feedbackLink') }}
          </ULink>
        </template>
      </I18nT>
    </template>
  </PageCard>
</template>

<script setup lang="ts">
const { locale, locales, setLocale } = useI18n()

const items = computed(() => locales.value.map((locale) => ({
  label: locale.name || 'test',
  value: locale.code,
  icon: `lang-${locale.code.toLowerCase()}`,
})))

const icon = computed(() => `lang-${locale.value.toLowerCase()}`)
</script>

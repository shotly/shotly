<template>
  <DefineThemeTemplate v-slot="{ label, description, colors, onSelect, checked }">
    <button
      :class="colors.background"
      class="cursor-pointer flex flex-col p-3 border rounded-lg border-default text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-inverted"
      @click="onSelect"
    >
      <div :class="colors.label" class="text-lg font-semibold flex items-center gap-2">
        <div class="rounded-full border border-elevated size-4 overflow-hidden">
          <span v-if="checked" class="flex items-center justify-center size-full after:bg-default after:rounded-full bg-primary after:size-1.5" />
        </div>

        <span>{{ label }}</span>
      </div>
      <div :class="colors.description" class="text-sm mb-auto pb-2">
        {{ description }}
      </div>
      <div
        v-for="(row, index) in [['w-[30px]', 'w-[100px]', 'w-[100px]'], ['w-[100px]', 'w-[70px]', 'w-[100px]']]"
        :key="index"
        class="flex gap-2 mt-1"
      >
        <div
          v-for="line in row"
          :key="line"
          :class="[line, colors.line]"
          class="rounded-md h-4"
        />
      </div>
    </button>
  </DefineThemeTemplate>

  <PageCard variant="subtle">
    <PageHeader
      :title="$t('settings.appearance.theme.title')"
      :description="$t('settings.appearance.theme.description')"
      class="mb-6"
    />

    <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
      <ReuseThemeTemplate
        v-for="action in actions"
        :key="action.label"
        v-bind="action"
      />
    </div>
  </PageCard>
</template>

<script setup lang="ts">
const colorMode = useColorMode()

const [DefineThemeTemplate, ReuseThemeTemplate] = createReusableTemplate<{
  label: string
  description: string
  checked: boolean
  onSelect: () => void
  colors: {
    background: string
    label: string
    description: string
    line: string
  }
}>()

const actions = computed(() => [
  {
    label: $t('common.appearance.system'),
    description: $t('settings.appearance.theme.systemDescription'),
    checked: colorMode.preference === 'system',
    onSelect: () => colorMode.preference = 'system',
    colors: {
      background: 'bg-default',
      label: 'text-highlighted',
      description: 'text-muted',
      line: 'bg-elevated',
    },
  },
  {
    label: $t('common.appearance.light'),
    description: $t('settings.appearance.theme.lightDescription'),
    checked: colorMode.preference === 'light',
    onSelect: () => colorMode.preference = 'light',
    colors: {
      background: 'bg-white',
      label: 'text-neutral-900',
      description: 'text-neutral-500',
      line: 'bg-neutral-100',
    },
  },
  {
    label: $t('common.appearance.dark'),
    description: $t('settings.appearance.theme.darkDescription'),
    checked: colorMode.preference === 'dark',
    onSelect: () => colorMode.preference = 'dark',
    colors: {
      background: 'bg-neutral-900',
      label: 'text-white',
      description: 'text-neutral-400',
      line: 'bg-neutral-800',
    },
  },
])
</script>

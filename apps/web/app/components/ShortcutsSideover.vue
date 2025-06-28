<template>
  <USlideover
    v-model:open="isShortcutsHelpOpen"
    :title="$t('shortcuts.title')"
    :description="$t('shortcuts.description')"
    :ui="{ body: 'p-0 sm:p-0' }"
  >
    <template #body>
      <div class="p-4 sm:p-6 sticky top-0 bg-default">
        <UInput
          v-model="search"
          :placeholder="$t('shortcuts.searchPlaceholder')"
          icon="lucide:search"
          class="w-full"
        />
      </div>

      <div
        v-for="group in filteredGroups"
        v-show="group.shortcuts.length > 0"
        :key="group.label"
        class="mb-4 px-4 sm:px-6"
      >
        <p class="mb-2 text-sm font-medium">
          {{ group.label }}
        </p>
        <div v-for="shortcut in group.shortcuts" :key="shortcut.label" class="flex justify-between mb-2 last:mb-0">
          <span class="flex items-center text-[13px] text-muted">{{ shortcut.label }}</span>
          <div class="flex items-center justify-end flex-shrink-0 gap-0.5">
            <UKbd v-for="kbd in shortcut.kbds" :key="kbd" :value="kbd" />
          </div>
        </div>
      </div>
    </template>
  </USlideover>
</template>

<script setup lang="ts">
interface ShortcutGroup {
  label: string
  shortcuts: {
    label: string
    kbds: string[]
  }[]
}

const { isShortcutsHelpOpen } = useApp()

const search = ref('')
const groups = computed<ShortcutGroup[]>(() => [
  {
    label: $t('shortcuts.groups.general'),
    shortcuts: [
      { label: $t('shortcuts.shortcuts.search'), kbds: ['/'] },
      { label: $t('shortcuts.shortcuts.openSettingsMenu'), kbds: [','] },
      { label: $t('shortcuts.shortcuts.openInbox'), kbds: ['meta', 'I'] },
      { label: $t('shortcuts.shortcuts.openRandomBookmark'), kbds: ['meta', 'R'] },
      { label: $t('shortcuts.shortcuts.openShortcutsMenu'), kbds: ['?'] },
      { label: $t('shortcuts.shortcuts.createNewBookmark'), kbds: ['C'] },
    ],
  },
])
const filteredGroups = computed(() => {
  return groups.value.map((group) => ({
    ...group,
    shortcuts: group.shortcuts.filter((shortcut) => shortcut.label.toLowerCase().includes(search.value.toLowerCase())),
  }))
})
</script>

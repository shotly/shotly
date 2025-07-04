<template>
  <USlideover
    v-model:open="isAsideMobileOpen"
    side="left"
    :ui="{
      content: 'w-60 divide-y-0',
      header: 'p-0 px-3 sm:p-0 sm:px-3 pb-0 sm:pb-0',
      body: 'p-0 px-3 sm:p-0 sm:px-3 flex flex-col mb-3',
    }"
  >
    <template #title>
      <AppLogotype class="px-2" />
    </template>

    <template #body>
      <slot name="aside" />
    </template>
  </USlideover>

  <div class="min-h-screen w-full flex flex-col md:pl-60 bg-elevated/50">
    <header class="h-11 flex items-center justify-between px-3 md:hidden">
      <UButton icon="lucide:menu" variant="soft" @click="isAsideMobileOpen = true" />
      <UButton
        icon="lucide:search"
        size="sm"
        variant="ghost"
        color="neutral"
        @click="isSearchOpen = true"
      />
    </header>

    <aside class="fixed top-0 left-0 bottom-0 w-full max-w-60 h-full flex-col hidden md:flex p-3 gap-3">
      <div class="flex items-center justify-between gap-1">
        <AppLogotype class="px-2" />
        <UTooltip :text="$t('common.search.tooltip')" :kbds="['/']">
          <UButton
            icon="lucide:search"
            size="sm"
            variant="ghost"
            color="neutral"
            @click="isSearchOpen = true"
          />
        </UTooltip>
      </div>

      <slot name="aside" />
    </aside>

    <main class="relative min-h-screen flex flex-col md:pt-1.5">
      <div class="flex-1 border-default dark:border-accented/80 bg-default py-4 sm:py-6 lg:py-8 rounded-tl-2xl rounded-tr-2xl border-l border-t border-r md:border-r-0 md:rounded-tr-none">
        <NuxtErrorBoundary>
          <slot />

          <template #error>
            <div class="absolute flex flex-col items-center justify-center top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <p class="font-medium mb-1">
                {{ $t('common.error.title') }}
              </p>
              <p class="text-sm mb-6 max-w-xs text-center text-muted">
                {{ $t('common.error.message') }}
              </p>
            </div>
          </template>
        </NuxtErrorBoundary>
      </div>
    </main>

    <ShortcutsSideover />
  </div>
</template>

<script lang="ts" setup>
const { isAsideMobileOpen, isSearchOpen } = useApp()
</script>

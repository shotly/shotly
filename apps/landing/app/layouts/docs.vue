<template>
  <div class="relative">
    <AppHeader>
      <template #body>
        <UContentNavigation
          :navigation="docsNavigation"
          color="neutral"
        />
      </template>
    </AppHeader>

    <UMain>
      <UContainer>
        <UPage
          :ui="{
            root: 'lg:grid-cols-4 lg:gap-8',
            left: 'lg:col-span-1',
            center: 'lg:col-span-3',
          }"
        >
          <template #left>
            <UPageAside :ui="{ root: 'lg:top-0 lg:max-h-screen' }">
              <UContentSearchButton
                :collapsed="false"
                :kbds="['meta', 'k']"
                variant="subtle"
                class="w-full mb-6"
              />

              <UContentNavigation
                :navigation="docsNavigation"
                color="neutral"
              />
            </UPageAside>
          </template>

          <slot />
        </UPage>
      </UContainer>

      <AppFooter />
    </UMain>
  </div>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'

const navigation = inject<Ref<ContentNavigationItem[]>>('navigation', ref([]))
const docsNavigation = computed(() => navigation.value.find((item) => item.path === '/docs')?.children || [])
</script>

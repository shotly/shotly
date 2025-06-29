<template>
  <div class="relative">
    <AppHeader />

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
            <UPageAside :ui="{ root: 'lg:top-0' }">
              <DocsNavigation :navigation="docsNavigation" />
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

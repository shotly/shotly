<template>
  <div class="space-y-3">
    <template v-for="item in navigation" :key="item.path">
      <div
        v-if="item.children && item.children.length > 0"
        :key="item.path"
        class="relative"
      >
        <div class="px-2.5 py-1 text-sm font-medium">
          <span class="truncate">
            {{ item.label }}
          </span>
          <nav class="relative mt-1">
            <UNavigationMenu
              :items="item.children"
              :ui="{ linkLeadingIcon: 'size-4' }"
              orientation="vertical"
            />
          </nav>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'

interface ContentNavigationLink extends ContentNavigationItem {
  icon?: string
}

interface DocsNavigationProps {
  navigation: ContentNavigationLink[]
}

const props = defineProps<DocsNavigationProps>()

const navigation = computed<NavigationMenuItem[]>(() => {
  return props.navigation.map((item) => ({
    label: item.title,
    to: item.path,
    children: item.children?.map((child) => ({
      label: child.title,
      to: child.path,
      icon: child.icon,
      badge: child.badge,
      disabled: child.disabled,
    })),
  }))
})
</script>

<template>
  <NuxtLayout name="with-aside">
    <template #aside>
      <Transition name="slide-up" mode="out-in">
        <Component :is="asideComponent" v-if="asideComponent" />
      </Transition>
      <!-- <div class="absolute inset-0 overflow-hidden -z-1">
        <div class="pointer-events-none mix-blend-overlay absolute left-0 bottom-40 aspect-square w-[140%] translate-y-2/4 rounded-full opacity-30 saturate-[10] blur-[75px] bg-primary-gradient" />
      </div> -->
    </template>

    <slot />

    <ShortcutsSideover />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { RouteNamedMap } from 'vue-router/auto-routes'
import { AsideAdmin, AsideBookmarks, AsideSettings } from '#components'

type RouteName = keyof RouteNamedMap

const bookmarksRoutes: RouteName[] = [
  'index',
  'collections',
  'collections-id',
]

const settingsRoutes: RouteName[] = [
  'settings',
  'settings-profile',
  'settings-appearance',
  'settings-api-keys',
  'settings-import',
  'settings-webhooks',
]

const adminRoutes: RouteName[] = [
  'admin',
  'admin-console',
  'admin-users',
]

const route = useRoute()

const asideComponent = computed(() => {
  if (bookmarksRoutes.includes(route.name)) {
    return AsideBookmarks
  }

  if (settingsRoutes.includes(route.name)) {
    return AsideSettings
  }

  if (adminRoutes.includes(route.name)) {
    return AsideAdmin
  }

  return undefined
})
</script>

<template>
  <NuxtLayout name="with-aside">
    <template #aside>
      <Transition name="slide-up" mode="out-in">
        <Component :is="asideComponent" v-if="asideComponent" />
      </Transition>

      <div class="flex flex-col gap-6 mt-auto">
        <!-- update message -->
        <div class="border-t border-default dark:border-accented/80 pt-3">
          <UserDropdown />
        </div>
      </div>
    </template>

    <slot />
  </NuxtLayout>
</template>

<script lang="ts" setup>
import type { RouteNamedMap } from 'vue-router/auto-routes'
import { AsideAdmin, AsideBookmarks, AsideSettings } from '#components'

type RouteName = keyof RouteNamedMap

const bookmarksRoutes: RouteName[] = [
  'index',
]

const settingsRoutes: RouteName[] = [
  'settings',
  'settings-account',
  'settings-api-keys',
  'settings-import',
  'settings-webhooks',
]

const adminRoutes: RouteName[] = [
  'admin',
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

import type { CUID } from '#shared/api'
import type { HookResult } from '@nuxt/schema'

declare module '#app' {
  interface RuntimeNuxtHooks {
    'collections:delete': (id: CUID) => HookResult
  }
}

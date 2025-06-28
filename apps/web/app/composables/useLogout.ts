import type { Ref } from '#imports'
import type { EventHookOn } from '@vueuse/shared'
import { clearNuxtData, ref, useUserSession } from '#imports'

export interface UseLogoutResult {
  isLoading: Ref<boolean>
  logout: () => Promise<void>
  onLoggedOut: EventHookOn<void>
}

export const useLogout = createSharedComposable<() => UseLogoutResult>(() => {
  const isLoading = ref(false)
  const { clear } = useUserSession()
  const { on: onLoggedOut, trigger: logoutTrigger } = createEventHook()

  async function logout() {
    isLoading.value = true

    try {
      clearNuxtData()
      await clear()
      logoutTrigger()
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    logout,
    onLoggedOut,
  }
})

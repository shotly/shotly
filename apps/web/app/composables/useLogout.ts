import type { Ref } from '#imports'
import type { EventHookOn } from '@vueuse/shared'
import { clearNuxtData, ref, useUserSession } from '#imports'

export interface UseLogoutResult {
  isLoading: Ref<boolean>
  logout: (redirectToLogin?: boolean) => Promise<void>
  onLoggedOut: EventHookOn<void>
}

export const useLogout = createSharedComposable<() => UseLogoutResult>(() => {
  const isLoading = ref(false)
  const { clear } = useUserSession()
  const { on: onLoggedOut, trigger: logoutTrigger } = createEventHook()

  async function logout(redirectToLogin: boolean = true) {
    isLoading.value = true

    try {
      clearNuxtData()
      await clear()
      logoutTrigger()

      if (redirectToLogin) {
        await navigateTo({ name: 'login' })
      }
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

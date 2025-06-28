import type { Ref } from '#imports'

export interface UseAppResult {
  isAsideMobileOpen: Ref<boolean>
  isShortcutsHelpOpen: Ref<boolean>
  isSearchOpen: Ref<boolean>
}

export const useApp = createSharedComposable<() => UseAppResult>(() => {
  const route = useRoute()
  const router = useRouter()

  const isAsideMobileOpen = ref(false)
  const isShortcutsHelpOpen = ref(false)
  const isSearchOpen = ref(false)

  defineShortcuts({
    '?': () => isShortcutsHelpOpen.value = !isShortcutsHelpOpen.value,
    ',': () => router.push({ name: 'settings' }),
  })

  watch(() => route.fullPath, () => {
    isAsideMobileOpen.value = false
  })

  return {
    isAsideMobileOpen,
    isShortcutsHelpOpen,
    isSearchOpen,
  }
})

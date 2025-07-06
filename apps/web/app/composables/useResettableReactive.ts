import type { Reactive } from 'vue'

export interface UseResettableReactiveResult<T extends object> {
  state: Reactive<T>
  reset: () => void
}

export function useResettableReactive<T extends object>(initialValue: () => T): UseResettableReactiveResult<T> {
  const state = reactive(initialValue())
  const reset = () => {
    Object.assign(state, initialValue())
  }

  return {
    state,
    reset,
  }
}

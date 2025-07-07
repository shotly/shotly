import type { AsyncDataRequestStatus } from '#app'
import type { Ref } from '#imports'
import { ref } from '#imports'

type AsyncHandler<D> = (...args: any[]) => Promise<D> | D

export interface UseAsyncHandlerResult<D, E> {
  status: Ref<AsyncDataRequestStatus>
  error: Ref<E | undefined>
  data: Ref<D | undefined>
  execute: (...args: unknown[]) => Promise<void>
  reset: () => void
}

export function useAsyncHandler<D, E = unknown>(handler: AsyncHandler<D>): UseAsyncHandlerResult<D, E> {
  const status = ref<AsyncDataRequestStatus>('idle')
  const data = ref<D | undefined>()
  const error = ref<E | undefined>()

  const execute = async (...args: any[]) => {
    try {
      status.value = 'pending'
      data.value = await handler(...args)
      error.value = undefined
      status.value = 'success'
    } catch (e) {
      error.value = e as E
      data.value = undefined
      status.value = 'error'
    }
  }

  const reset = () => {
    status.value = 'idle'
    error.value = undefined
    data.value = undefined
  }

  return {
    status,
    error,
    data,
    execute,
    reset,
  }
}

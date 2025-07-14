import type { ButtonProps } from '@nuxt/ui'
import { LazyModalConfirm } from '#components'
import { useOverlay } from '#imports'

interface UseConfirmOptions {
  title: string
  message: string
  confirmButton: ButtonProps
  onConfirm: () => Promise<any> | any
}

interface UseConfirmReturn {
  open: () => void
  close: () => void
}

export function useConfirm(options: UseConfirmOptions): UseConfirmReturn {
  const modal = useOverlay().create(LazyModalConfirm)

  function open() {
    return modal.open({
      title: options.title,
      message: options.message,
      confirmButton: options.confirmButton,
      onConfirm: options.onConfirm,
    })
  }

  function close() {
    modal.close()
  }

  return {
    open,
    close,
  }
}

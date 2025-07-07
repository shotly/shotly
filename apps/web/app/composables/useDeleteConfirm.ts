import type { NitroFetchRequest } from 'nitropack'
import type { AsyncDataRequestStatus } from 'nuxt/app'
import type { Ref } from 'vue'
import { ModalConfirm } from '#components'
import { useOverlay } from '#imports'

interface UseDeleteConfirmOptions {
  url: NitroFetchRequest
  title?: string
  message?: string
  onSuccess?: () => void
}

interface UseDeleteConfirmReturn {
  execute: () => void
  status: Ref<AsyncDataRequestStatus>
}

export function useDeleteConfirm(options: UseDeleteConfirmOptions): UseDeleteConfirmReturn {
  const modal = useOverlay().create(ModalConfirm, { destroyOnClose: true })
  const { $i18n: { t }, $api } = useNuxtApp()

  const { execute: _execute, status } = useAsyncHandler(() => $api(options.url, {
    method: 'delete',
    key: () => `delete-confirm-${options.url}`,
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      options.onSuccess?.()
    },
  }))

  function execute() {
    modal.open({
      title: options.title ?? t('common.deletion.title'),
      message: options.message ?? t('common.deletion.message'),
      confirmButton: {
        color: 'error',
      },
      onConfirm: () => _execute(),
    })
  }

  return {
    execute,
    status,
  }
}

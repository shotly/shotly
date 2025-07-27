<template>
  <UDropdownMenu
    :items="actions"
    :ui="{ content: 'w-50' }"
    :content="content"
    @update:open="emit('update:open', $event)"
  >
    <slot>
      <UButton icon="lucide:ellipsis" variant="outline" color="neutral" />
    </slot>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { CollectionsListItem } from '#shared/api'
import type { DropdownMenuItem, DropdownMenuProps } from '@nuxt/ui'
import { LazyCollectionsFormModal, LazyCollectionsShareModal } from '#components'

export interface CollectionsControlsProps {
  collectionItem: CollectionsListItem
  type?: 'short' | 'full'
  content?: DropdownMenuProps['content']
}

export interface CollectionsControlsEmits {
  'update:open': [value: boolean]
}

export interface CollectionsControlsSlots {
  default?: () => any
}

const props = withDefaults(defineProps<CollectionsControlsProps>(), {
  type: 'short',
  content: () => ({ side: 'bottom', align: 'end' }),
})
const emit = defineEmits<CollectionsControlsEmits>()

const { $api, hooks } = useNuxtApp()
const { refresh: refreshCollections } = useCollections()

const shareModal = useOverlay().create(LazyCollectionsShareModal)
const formModal = useOverlay().create(LazyCollectionsFormModal)

const actions = computed<DropdownMenuItem[]>(() => [
  [
    {
      label: $t('common.actions.edit'),
      kbds: ['e'],
      icon: 'lucide:pencil',
      onSelect: () => formModal.open({
        id: props.collectionItem.id,
        initialState: {
          name: props.collectionItem.name,
          icon: props.collectionItem.icon,
          description: props.collectionItem.description,
          parentId: props.collectionItem.parentId,
        },
        onSuccess: async () => {
          formModal.close()
        },
      }),
    },
    {
      label: $t('common.actions.share'),
      kbds: ['s'],
      icon: 'lucide:globe',
      onSelect: () => {
        shareModal.open({
          id: props.collectionItem.id,
          isShared: props.collectionItem.isShared,
          onSuccess: () => {
            refreshCollections()
          },
        })
      },
    },
    ...(props.type === 'full'
      ? [
          {
            label: $t('common.actions.reorganize'),
            kbds: ['r'],
            icon: 'lucide:send-to-back',
          },
        ]
      : []),
    {
      label: $t('common.actions.merge'),
      kbds: ['m'],
      icon: 'lucide:combine',
      onSelect: () => {
        // todo: implement merge
      },
    },
    {
      label: $t('common.actions.delete'),
      kbds: ['d'],
      icon: 'lucide:trash',
      color: 'error',
      onSelect: () => {
        const { open } = useConfirm({
          title: $t('common.deletion.title'),
          message: $t('common.deletion.message'),
          confirmButton: { color: 'error', label: $t('common.actions.delete') },
          onConfirm: async () => {
            await $api(`/api/collections/${props.collectionItem.id}` as string, { method: 'delete' })
            await refreshCollections()
            await hooks.callHook('collections:delete', props.collectionItem.id)
          },
        })

        open()
      },
    },
  ],
])
</script>

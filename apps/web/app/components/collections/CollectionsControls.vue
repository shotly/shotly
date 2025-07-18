<template>
  <UDropdownMenu
    :items="actions"
    v-bind="dropdownAdvancedProps"
    @update:open="emit('update:open', $event)"
  >
    <slot>
      <UButton icon="lucide:ellipsis-vertical" variant="outline" color="neutral" />
    </slot>

    <template #display>
      <div class="flex flex-col items-start flex-1 w-full">
        <URadioGroup
          v-model="viewLayout"
          indicator="hidden"
          variant="card"
          orientation="horizontal"
          :items="viewLayoutItems"
          :ui="{
            root: 'w-full',
            item: 'flex-1 p-0 h-16 justify-center items-center border-transparent has-data-[state=checked]:border-accented has-data-[state=checked]:bg-elevated hover:bg-elevated/50 transition-colors',
            label: 'flex flex-col items-center gap-1',
          }"
        >
          <template #label="{ item }">
            <UIcon :name="item.icon" class="text-xl" />
            <span>{{ item.label }}</span>
          </template>
        </URadioGroup>
      </div>
    </template>

    <template #view>
      <div class="flex flex-col items-start">
        <div class="text-muted font-normal uppercase text-xs mb-2">
          {{ $t('collections.controls.properties.title') }}
        </div>

        <ToggleList
          v-model="displayProperties"
          :items="displayPropertiesItems"
        />
      </div>
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { CollectionsListItem, CUID } from '#shared/api'
import type { DropdownMenuItem } from '@nuxt/ui'
import { LazyCollectionsFormModal, LazyCollectionsShareModal } from '#components'

export interface CollectionsControlsProps {
  collectionItem: Omit<CollectionsListItem, 'children'>
  type?: 'short' | 'full'
}

export interface CollectionsControlsEmits {
  'update:open': [value: boolean]
  'delete': [value: CUID]
}

export interface CollectionsControlsSlots {
  default?: () => any
}

const props = withDefaults(defineProps<CollectionsControlsProps>(), {
  type: 'short',
})
const emit = defineEmits<CollectionsControlsEmits>()

const { $api } = useNuxtApp()
const { displayProperties, viewLayout, refresh: refreshCollections } = useCollections()

const shareModal = useOverlay().create(LazyCollectionsShareModal)
const formModal = useOverlay().create(LazyCollectionsFormModal)

const dropdownAdvancedProps = computed(() => {
  if (props.type === 'full') {
    return {
      content: { side: 'bottom', align: 'end' },
      ui: { content: 'w-80' },
    } as const
  }

  return {
    content: { side: 'bottom', align: 'end', avoidCollisions: false, collisionPadding: 0 },
    ui: { content: 'w-50' },
  } as const
})

const viewLayoutItems = computed(() => [
  { value: 'grid', label: $t('collections.controls.layout.grid'), icon: 'lucide:layout-grid' },
  { value: 'list', label: $t('collections.controls.layout.list'), icon: 'lucide:stretch-horizontal' },
  { value: 'stack', label: $t('collections.controls.layout.stack'), icon: 'lucide:list' },
])

const displayPropertiesItems = computed(() => [
  { value: 'link', label: $t('collections.controls.properties.link') },
  { value: 'name', label: $t('collections.controls.properties.name') },
  { value: 'image', label: $t('collections.controls.properties.image') },
  { value: 'icon', label: $t('collections.controls.properties.icon') },
  { value: 'date', label: $t('collections.controls.properties.date') },
])

const actions = computed<DropdownMenuItem[]>(() => [
  ...(props.type === 'full'
    ? [
        [
          {
            slot: 'display',
            type: 'label',
          },
        ],
        [
          {
            slot: 'view',
            type: 'label',
          },
        ],
      ]
    : []
  ),
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
            emit('delete', props.collectionItem.id)
          },
        })

        open()
      },
    },
  ],
])
</script>

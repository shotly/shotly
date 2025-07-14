<template>
  <DefineItemTemplate v-slot="{ item, level = 0 }">
    <AccordionItem as="li" class="min-w-0" :value="item.id">
      <ULink
        v-slot="{ active }"
        :to="{ name: 'collections-id', params: { id: item.id } }"
        class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 flex-row px-2.5 before:inset-y-px before:inset-x-0 py-2 focus-visible:before:ring-primary hover:text-highlighted hover:before:bg-elevated/50 data-[active=true]:text-highlighted data-[active=true]:before:bg-elevated/50 transition-colors before:transition-colors"
        inactive-class="text-muted"
        active-class="text-primary before:bg-elevated"
        :data-active="activeOption === item.id ? 'true' : undefined"
      >
        <AccordionTrigger
          v-if="item.children?.length"
          as="span"
          class="z-1 size-6 absolute left-2.5 top-2 flex items-end justify-end group/trigger"
          @click.stop.prevent
        >
          <span class="bg-elevated rounded-full size-3.5 flex items-center justify-center">
            <UIcon name="lucide:chevron-right" class="size-3 group-data-[state=open]/trigger:rotate-90 transition-transform" />
          </span>
        </AccordionTrigger>

        <UIcon :name="item.icon" class="shrink-0 size-5 group-hover:text-default transition-colors" :class="active || activeOption === item.id ? 'text-primary' : 'text-dimmed'" />
        <span class="truncate w-full flex items-center">{{ item.name }}</span>
        <span class="flex-1 flex items-center justify-center gap-2" @click.stop.prevent>
          <UIcon
            v-if="item.isShared && activeOption !== item.id"
            name="lucide:globe"
            class="size-4 text-dimmed group-hover:hidden"
          />

          <UDropdownMenu
            :items="getItemOptions(item)"
            :content="{ side: 'bottom', align: 'end', avoidCollisions: false, collisionPadding: 0 }"
            :ui="{ content: 'w-50' }"
            @update:open="handleOptionOpen(item.id, $event)"
          >
            <UIcon name="lucide:ellipsis" class="size-4 group-hover:block data-[state=open]:block hidden" />
          </UDropdownMenu>
        </span>
      </ULink>

      <AccordionContent
        v-if="item.children?.length"
        as="ul"
        class="isolate ms-5 border-s border-default data-[state=open]:animate-[scale-in_100ms_ease-out] data-[state=closed]:animate-[scale-out_100ms_ease-in] origin-(--reka-dropdown-menu-content-transform-origin)"
      >
        <ReuseItemTemplate
          v-for="child in item.children"
          :key="child.id"
          :item="child"
          :level="level + 1"
          class="ps-1.5 -ms-px"
        />
      </AccordionContent>
    </AccordionItem>
  </DefineItemTemplate>

  <nav v-if="items" class="relative flex flex-col gap-1.5">
    <AccordionRoot
      v-model="visibleItems"
      as="ul"
      class="isolate min-w-0"
      type="multiple"
    >
      <ReuseItemTemplate v-for="item in items" :key="item.id" :item="item" />
    </AccordionRoot>
  </nav>
</template>

<script setup lang="ts">
import type { CollectionsListItem, CUID } from '#shared/api'
import type { DropdownMenuItem } from '@nuxt/ui'
import { LazyCollectionsFormModal, LazyCollectionsShareModal } from '#components'
import { AccordionContent, AccordionItem, AccordionRoot, AccordionTrigger } from 'reka-ui'

export interface CollectionsMenuProps {
  items?: CollectionsListItem[]
}

defineOptions({ inheritAttrs: false })
defineProps<CollectionsMenuProps>()

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: CollectionsListItem, level?: number }>({
  props: {
    item: Object as PropType<CollectionsListItem>,
    level: Number as PropType<number>,
  },
})

const { $api } = useNuxtApp()
const { refresh: refreshCollections } = useCollections()

const shareModal = useOverlay().create(LazyCollectionsShareModal)
const formModal = useOverlay().create(LazyCollectionsFormModal)

// visible items, used for the accordion.
const visibleItems = useLocalStorage<CUID[]>('shotly-collections-menu', [])

// current active item, used for the dropdown menu and the active state of the accordion
const activeOption = ref<CUID | null>(null)

function handleOptionOpen(value: CUID, open: boolean) {
  activeOption.value = open ? value : null
}

function getItemOptions(item: CollectionsListItem): DropdownMenuItem[] {
  return [
    {
      label: $t('common.actions.edit'),
      kbds: ['e'],
      icon: 'lucide:pencil',
      onSelect: () => formModal.open({
        id: item.id,
        initialState: {
          name: item.name,
          icon: item.icon,
          parentId: item.parentId,
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
          id: item.id,
          isShared: item.isShared,
          onSuccess: () => {
            refreshCollections()
          },
        })
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
            await $api(`/api/collections/${item.id}` as string, { method: 'delete' })
            await refreshCollections()
          },
        })

        open()
      },
    },
  ]
}
</script>

<template>
  <DefineItemTemplate v-slot="{ item, level = 0 }">
    <li class="min-w-0">
      <ULink
        v-slot="{ active }"
        :to="{ name: 'collections-id', params: { id: item.value } }"
        class="group relative w-full flex items-center gap-1.5 font-medium text-sm before:absolute before:z-[-1] before:rounded-md focus:outline-none focus-visible:outline-none dark:focus-visible:outline-none focus-visible:before:ring-inset focus-visible:before:ring-2 flex-row px-2.5 before:inset-y-px before:inset-x-0 py-2 focus-visible:before:ring-primary hover:text-highlighted hover:before:bg-elevated/50 data-[active=true]:text-highlighted data-[active=true]:before:bg-elevated/50 transition-colors before:transition-colors"
        inactive-class="text-muted"
        active-class="text-primary before:bg-elevated"
        :data-active="activeOption === item.value ? 'true' : undefined"
      >
        <span v-if="item.children" class="z-1 size-6 absolute left-2.5 top-2 flex items-end justify-end" @click.stop.prevent>
          <span class="bg-elevated rounded-full size-3.5 flex items-center justify-center">
            <UIcon name="lucide:chevron-right" class="size-3" />
          </span>
        </span>

        <UIcon :name="item.icon" class="shrink-0 size-5 group-hover:text-default transition-colors" :class="active || activeOption === item.value ? 'text-primary' : 'text-dimmed'" />
        <span class="truncate w-full flex items-center">{{ item.label }}</span>
        <span class="flex-1 flex items-center justify-center" @click.stop.prevent>
          <UDropdownMenu
            :items="getItemOptions(item)"
            :content="{ side: 'bottom', align: 'end', avoidCollisions: false }"
            @update:open="handleOptionOpen(item.value, $event)"
          >
            <UIcon name="lucide:ellipsis" class="size-4 group-hover:block data-[state=open]:block hidden" />
          </UDropdownMenu>
        </span>
      </ULink>

      <div v-if="item.children">
        <ul class="isolate ms-5 border-s border-default">
          <ReuseItemTemplate
            v-for="child in item.children"
            :key="child.value"
            :item="child"
            :level="level + 1"
            class="ps-1.5 -ms-px"
          />
        </ul>
      </div>
    </li>
  </DefineItemTemplate>

  <nav v-if="collectionsMenu" class="relative flex flex-col gap-1.5">
    <ul class="isolate min-w-0">
      <ReuseItemTemplate
        v-for="item in collectionsMenu"
        :key="item.value"
        :item="item"
      />
    </ul>
  </nav>
</template>

<script setup lang="ts">
import type { CUID } from '#shared/api'
import type { DropdownMenuItem } from '@nuxt/ui'

export interface CollectionsMenuItem {
  value: CUID
  label: string
  icon: string
  children?: CollectionsMenuItem[]
}

defineOptions({ inheritAttrs: false })

const { data: collections } = useCollections()
const collectionsMenu = computed<CollectionsMenuItem[]>(() => transformCollections(collections.value ?? []))

const [DefineItemTemplate, ReuseItemTemplate] = createReusableTemplate<{ item: CollectionsMenuItem, level?: number }>({
  props: {
    item: Object as PropType<CollectionsMenuItem>,
    level: Number as PropType<number>,
  },
})

const activeOption = ref<CUID | null>(null)
function handleOptionOpen(value: CUID, open: boolean) {
  if (open) {
    activeOption.value = value
  } else {
    activeOption.value = null
  }
}
function getItemOptions(item: CollectionsMenuItem): DropdownMenuItem[] {
  return [
    {
      label: $t('common.actions.delete'),
      icon: 'lucide:trash',
      color: 'error',
    },
  ]
}
</script>

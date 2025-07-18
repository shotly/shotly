<template>
  <UButton label="Add new bookmark" />
  <UDropdownMenu
    :open="true"
    :items="actions"
    :content="{ side: 'bottom', align: 'end' }"
    :ui="{ content: 'w-80' }"
  >
    <UButton
      icon="lucide:ellipsis-vertical"
      variant="outline"
      color="neutral"
      orientation="horizontal"
    />

    <template #display>
      <div class="flex flex-col items-start flex-1 w-full">
        <URadioGroup
          indicator="hidden"
          variant="card"
          default-value="grid"
          orientation="horizontal"
          :items="items"
          :ui="{
            root: 'w-full',
            item: 'flex-1 p-0 h-16 justify-center items-center',
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
          Display Properties
        </div>
        <div class="flex items-center gap-2">
          <UBadge color="neutral" variant="subtle" label="Link" />
          <UBadge color="neutral" variant="subtle" label="Name" />
          <UBadge color="neutral" variant="subtle" label="Image" />
          <UBadge color="neutral" variant="outline" label="Icon" />
          <UBadge color="neutral" variant="outline" label="Date" />
        </div>
      </div>
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const items = ref([
  { label: 'Grid', icon: 'lucide:layout-grid' },
  { label: 'List', icon: 'lucide:stretch-horizontal' },
  { label: 'Stack', icon: 'lucide:list' },
])

const actions = computed<DropdownMenuItem[]>(() => [
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
  [
    {
      label: $t('common.actions.edit'),
      kbds: ['e'],
      icon: 'lucide:pencil',
    },
    {
      label: $t('common.actions.share'),
      kbds: ['s'],
      icon: 'lucide:globe',
    },
    {
      label: $t('common.actions.reorganize'),
      kbds: ['r'],
      icon: 'lucide:send-to-back',
    },
    {
      label: $t('common.actions.merge'),
      kbds: ['m'],
      icon: 'lucide:combine',
    },
    {
      label: $t('common.actions.delete'),
      kbds: ['d'],
      icon: 'lucide:trash',
      color: 'error' as const,
    },
  ],
])
</script>

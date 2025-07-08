<template>
  <PageList :items="items" :loading="status === 'pending'">
    <template #item="{ item }">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="text-sm">
          <div class="font-medium text-highlighted">
            {{ item.url }}
          </div>
          <div class="text-muted">
            {{ item.events.join(', ') }}
          </div>
        </div>

        <div class="flex items-center justify-between gap-2 text-sm md:justify-end">
          <div class="text-muted">
            {{ $t('common.fields.createdAt') }}
            <DateTime :datetime="item.createdAt" relative />
          </div>

          <UDropdownMenu :items="rowActions(item)" :content="{ align: 'end' }">
            <UButton icon="lucide:ellipsis" variant="ghost" />
          </UDropdownMenu>
        </div>
      </div>
    </template>
    <template #empty>
      <EmptyState
        :title="$t('settings.webhooks.emptyTitle')"
        :description="$t('settings.webhooks.emptyDescription')"
        icon="lucide:webhook"
      />
    </template>
    <template #loading>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex flex-col gap-1">
          <USkeleton class="h-4 w-[250px]" />
          <div class="flex flex-wrap gap-1">
            <USkeleton class="h-4 w-[40px]" />
            <USkeleton class="h-4 w-[60px]" />
          </div>
        </div>
        <div>
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </template>
  </PageList>
</template>

<script setup lang="ts">
import type { WebhooksListItem } from '#shared/api'
import type { DropdownMenuItem } from '@nuxt/ui'

const { data: items, status, refresh } = useApi('/api/webhooks')

function rowActions(row: WebhooksListItem): DropdownMenuItem[] {
  return [
    {
      label: $t('common.actions.delete'),
      icon: 'lucide:trash',
      color: 'error',
      onSelect: () => {
        useDeleteConfirm({
          url: `/api/webhooks/${row.id}`,
          onSuccess: refresh,
        }).execute()
      },
    },
  ]
}

defineExpose({
  refresh,
})
</script>

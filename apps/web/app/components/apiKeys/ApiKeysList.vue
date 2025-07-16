<template>
  <PageList :items="items" :loading="status === 'pending'">
    <template #item="{ item }">
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="text-sm">
          <div class="font-medium text-highlighted">
            {{ item.name }}
          </div>
          <div class="text-muted">
            <template v-if="isExpired(item.expiresAt)">
              <span class="text-error">{{ $t('common.actions.expired') }}</span>
            </template>
            <template v-else>
              {{ $t('common.fields.expiresAt') }}
              <DateTime v-if="item.expiresAt" :datetime="item.expiresAt" relative />
              <span v-else class="text-muted">{{ $t('common.date.never').toLowerCase() }}</span>
            </template>
          </div>
        </div>

        <div class="flex items-center justify-between gap-2 text-sm md:justify-end">
          <div v-if="item.lastUsedAt" class="text-muted">
            {{ $t('common.fields.lastUsedAt') }}
            <DateTime :datetime="item.lastUsedAt" relative />
          </div>

          <UDropdownMenu :items="rowActions(item)" :content="{ align: 'end' }">
            <UButton icon="lucide:ellipsis" variant="ghost" size="md" />
          </UDropdownMenu>
        </div>
      </div>
    </template>
    <template #empty>
      <EmptyState
        :title="$t('settings.apiKeys.emptyTitle')"
        :description="$t('settings.apiKeys.emptyDescription')"
        icon="lucide:key-round"
      />
    </template>
    <template #loading>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div class="flex flex-col gap-1">
          <USkeleton class="h-4 w-[250px]" />
          <USkeleton class="h-4 w-[120px]" />
        </div>
        <div>
          <USkeleton class="h-4 w-[200px]" />
        </div>
      </div>
    </template>
  </PageList>
</template>

<script setup lang="ts">
import type { ApiKeysListItem } from '#shared/api'
import type { DropdownMenuItem } from '@nuxt/ui'

const { data: items, status, refresh } = useApi('/api/api-keys')

function rowActions(row: ApiKeysListItem): DropdownMenuItem[] {
  return [
    {
      label: $t('common.actions.delete'),
      icon: 'lucide:trash',
      color: 'error',
      onSelect: () => {
        useDeleteConfirm({
          url: `/api/api-keys/${row.id}`,
          onSuccess: refresh,
        }).execute()
      },
    },
  ]
}

function isExpired(expiresAt?: string | null): boolean {
  return !!expiresAt && new Date(expiresAt) < new Date()
}

defineExpose({
  refresh,
})
</script>

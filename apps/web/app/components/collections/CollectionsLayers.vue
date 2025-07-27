<template>
  <UPopover
    :content="{ side: 'bottom', align: 'end' }"
    :ui="{ content: 'w-80' }"
    @update:open="emit('update:open', $event)"
  >
    <UButton icon="lucide:layers" variant="outline" color="neutral" />

    <template #content>
      <div class="flex flex-col divide-y divide-muted">
        <URadioGroup
          v-model="viewLayout"
          indicator="hidden"
          variant="card"
          orientation="horizontal"
          :items="viewLayoutItems"
          :ui="{
            root: 'w-full p-2.5',
            item: 'flex-1 p-0 h-16 justify-center items-center border-transparent has-data-[state=checked]:border-accented has-data-[state=checked]:bg-elevated hover:bg-elevated/50 transition-colors',
            label: 'flex flex-col items-center gap-1',
          }"
        >
          <template #label="{ item }">
            <UIcon :name="item.icon" class="text-xl" />
            <span>{{ item.label }}</span>
          </template>
        </URadioGroup>

        <div class="flex flex-col items-start p-2.5">
          <div class="text-muted font-normal uppercase text-xs mb-2">
            {{ $t('collections.layers.properties.title') }}
          </div>

          <ToggleList v-model="displayProperties" :items="displayPropertiesItems" />
        </div>
      </div>
    </template>
  </UPopover>
</template>

<script setup lang="ts">
export interface CollectionsControlsEmits {
  'update:open': [value: boolean]
}

const emit = defineEmits<CollectionsControlsEmits>()

const viewLayout = useLocalStorage<ViewLayout>('shotly-collections-view-layout', 'grid')
const viewLayoutItems = computed(() => [
  { value: 'grid', label: $t('collections.layers.layout.grid'), icon: 'lucide:layout-grid' },
  { value: 'list', label: $t('collections.layers.layout.list'), icon: 'lucide:stretch-horizontal' },
  { value: 'stack', label: $t('collections.layers.layout.stack'), icon: 'lucide:list' },
])

const displayProperties = useLocalStorage<string[]>('shotly-collections-display-properties', [
  'link', 'name', 'image', 'icon', 'date',
])
const displayPropertiesItems = computed(() => [
  { value: 'link', label: $t('collections.layers.properties.link') },
  { value: 'name', label: $t('collections.layers.properties.name') },
  { value: 'image', label: $t('collections.layers.properties.image') },
  { value: 'icon', label: $t('collections.layers.properties.icon') },
  { value: 'date', label: $t('collections.layers.properties.date') },
])
</script>

<template>
  <UContainer>
    <PageHeader
      :title="collection?.name"
      :description="collection?.description ?? undefined"
      class="mb-6"
    >
      <template #links>
        <UButton label="Add new bookmark" />

        <CollectionsControls
          v-if="collection"
          type="full"
          :collection-item="collection"
          @delete="navigateTo({ name: 'index' })"
        />
      </template>
    </PageHeader>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute<'collections-id'>()
const { map } = useCollections()

const collection = computed(() => map.value.get(route.params.id))

if (!collection.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Collection not found',
  })
}
</script>

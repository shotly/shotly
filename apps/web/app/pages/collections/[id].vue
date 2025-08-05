<template>
  <UContainer>
    <PageHeader
      :title="collection?.name"
      :description="collection?.description ?? '&nbsp;'"
      class="mb-6"
    >
      <template #links>
        <UButton label="Add new bookmark" />
        <CollectionsLayers />
        <CollectionsActions
          v-if="collection"
          type="full"
          :collection-item="collection"
        />
      </template>
    </PageHeader>

    <div v-if="status === 'pending'">
      <USkeleton class="h-10 w-full" />
    </div>

    <div v-else>
      {{ bookmarks }}
    </div>
  </UContainer>
</template>

<script setup lang="ts">
const route = useRoute<'collections-id'>()
const { map } = useCollections()

const { hook } = useNuxtApp()
hook('collections:delete', (id) => {
  if (id === route.params.id) {
    navigateTo({ name: 'index' })
  }
})

const collection = computed(() => map.value.get(route.params.id))

if (!collection.value) {
  throw createError({
    statusCode: 404,
    statusMessage: 'Collection not found',
  })
}

const { data: bookmarks, status } = await useApi(`/api/collections/${route.params.id}/bookmarks`)
</script>

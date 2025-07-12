<template>
  <ViewModal
    v-model:open="isCollectionsFormCreateModalOpen"
    :title="$t('collections.create.title')"
    :description="$t('collections.create.description')"
    @after:leave="onCloseModal"
  >
    <template #body>
      <UForm
        class="space-y-6"
        :validate-on="['input']"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField name="name" :label="$t('common.fields.name')">
          <UInput v-model="state.name" class="w-full" :icon="state.icon" />
        </UFormField>
        <UFormField name="parentId" :label="$t('common.fields.parentCollection')" :hint="$t('common.fields.optional')">
          <USelect v-model="state.parentId" class="w-full" :items="collectionsItems" />
        </UFormField>

        <UButton
          class="w-full justify-center"
          :label="$t('common.actions.create')"
          loading-auto
          type="submit"
        />
      </UForm>
    </template>
  </ViewModal>
</template>

<script setup lang="ts">
import type { CUID, CollectionsForm as Schema } from '#shared/api'
import type { FormSubmitEvent } from '@nuxt/ui'
import { collectionsFormSchema as schema } from '#shared/api'
import { defu } from 'defu'

export interface CollectionsFormCreateModalProps {
  id?: CUID
  initialState?: Partial<Schema>
}

export interface CollectionsFormCreateModalEmits {
  created: [id: CUID]
  close: []
}

const props = defineProps<CollectionsFormCreateModalProps>()
const emit = defineEmits<CollectionsFormCreateModalEmits>()

const { $api } = useNuxtApp()
const { isCollectionsFormCreateModalOpen } = useApp()
const { data: collections, refresh: refreshCollections } = useCollections()

// pick only collections without children
const collectionsItems = computed(
  () => collections.value?.map((collection) => ({
    label: collection.name,
    value: collection.id,
    icon: collection.icon,
  })),
)

const { state, reset } = useResettableReactive<Schema>(() => defu(props.initialState, {
  name: '',
  icon: 'lucide:folder',
}))

function onCloseModal() {
  reset()
  emit('close')
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $api('/api/collections', {
    method: 'POST',
    body: event.data,
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      emit('created', response._data.id)
      await refreshCollections()

      isCollectionsFormCreateModalOpen.value = false

      // todo: handle success message
    },
  })
}
</script>

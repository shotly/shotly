<template>
  <ModalBrand
    :title="props.id ? $t('collections.edit.title') : $t('collections.create.title')"
    icon="lucide:shapes"
    @after:leave="onCloseModal"
  >
    <template #description>
      {{ props.id ? $t('collections.edit.description') : $t('collections.create.description') }}
      <LinkBlank
        v-if="!props.id"
        :href="appConfig.links.docsCollections"
        :label="$t('common.actions.learnMore')"
      />
    </template>

    <template #body>
      <UForm
        class="space-y-6"
        :validate-on="['input']"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <UFormField name="name" :label="$t('common.fields.name')">
          <UInput
            v-model="state.name"
            class="w-full"
            :placeholder="$t('common.placeholders.collectionName')"
          >
            <template #leading>
              <SelectIcon v-model="state.icon" />
            </template>
          </UInput>
        </UFormField>
        <UFormField name="description" :label="$t('common.fields.description')" :hint="$t('common.fields.optional')">
          <InputClearable
            v-model="state.description"
            class="w-full"
            :reset-value="null"
            :placeholder="$t('common.placeholders.collectionDescription')"
          />
        </UFormField>
        <UFormField name="parentId" :label="$t('common.fields.parentCollection')" :hint="$t('common.fields.optional')">
          <SelectMenuClearable
            v-model="state.parentId"
            class="w-full"
            value-key="value"
            :items="collectionsItems"
            :placeholder="$t('common.placeholders.parentCollection')"
            :reset-value="null"
          />
        </UFormField>

        <UButton
          class="w-full justify-center"
          :label="$t('common.actions.create')"
          loading-auto
          type="submit"
        />
      </UForm>
    </template>
  </ModalBrand>
</template>

<script setup lang="ts">
import type { CUID, CollectionsForm as Schema } from '#shared/api'
import type { FormSubmitEvent } from '@nuxt/ui'
import { collectionsFormSchema as schema } from '#shared/api'
import { defu } from 'defu'

export interface CollectionsFormModalProps {
  id?: CUID
  initialState?: Schema
}

export interface CollectionsFormModalEmits {
  success: []
  close: []
}

const props = defineProps<CollectionsFormModalProps>()
const emit = defineEmits<CollectionsFormModalEmits>()

const { $api } = useNuxtApp()
const appConfig = useAppConfig()
const { data: collections, refresh: refreshCollections } = useCollections()

// pick only collections without children
const collectionsItems = computed(
  () => collections.value?.map((collection) => ({
    label: collection.name,
    value: collection.id,
    icon: collection.icon,
  })),
)

const serverEndpoint = computed(() =>
  props.id ? { method: 'put', path: `/api/collections/${props.id}` } as const : { method: 'post', path: '/api/collections' } as const,
)

const { state, reset } = useResettableReactive<Schema>(() => defu(props.initialState, {
  name: '',
  parentId: null,
  description: null,
  icon: 'lucide:folder',
}))

function onCloseModal() {
  reset()
  emit('close')
}

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $api(serverEndpoint.value.path, {
    method: serverEndpoint.value.method,
    body: {
      ...event.data,
      description: event.data.description || null,
    },
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      await refreshCollections()
      emit('success')

      // todo: handle success message
    },
  })
}
</script>

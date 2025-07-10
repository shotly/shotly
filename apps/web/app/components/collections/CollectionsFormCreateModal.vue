<template>
  <UModal
    v-model:open="isCollectionsFormCreateModalOpen"
    :title="$t('collections.create.title')"
    :description="$t('collections.create.description')"
    :ui="{
      footer: 'justify-end bg-elevated/50',
    }"
  >
    <template #body>
      <UForm
        id="collections-form-create"
        ref="form"
        class="space-y-3"
        :schema="schema"
        :state="state"
        @submit="onSubmit"
      >
        <div class="grid grid-cols-10 gap-3">
          <UFormField name="icon" :label="$t('common.fields.icon')" class="col-span-2">
            <USelect class="w-full" />
          </UFormField>
          <UFormField name="name" :label="$t('common.fields.name')" class="col-span-8">
            <UInput v-model="state.name" class="w-full" />
          </UFormField>
        </div>
        <UFormField name="description" :label="$t('common.fields.description')">
          <UInput v-model="state.description" class="w-full" />
        </UFormField>
        <UFormField name="parentId" :label="$t('common.fields.parentCollection')">
          ...
        </UFormField>
      </UForm>
    </template>

    <template #footer>
      <UButton
        form="collections-form-create"
        :loading="form?.loading"
        :label="$t('common.actions.create')"
        @click="emit('close')"
      />
    </template>
  </UModal>
</template>

<script setup lang="ts">
import type { CollectionsCreatePayload as Schema, CUID } from '#shared/api'
import type { FormSubmitEvent } from '@nuxt/ui'
import { collectionsCreatePayloadSchema as schema } from '#shared/api'

export interface CollectionsFormCreateModalEmits {
  created: [id: CUID]
  close: []
}

const emit = defineEmits<CollectionsFormCreateModalEmits>()

const { $api } = useNuxtApp()
const { isCollectionsFormCreateModalOpen } = useApp()
const form = useTemplateRef('form')
const { state, reset } = useResettableReactive<Schema>(() => ({
  name: '',
  icon: '',
  description: '',
  parentId: '',
}))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $api('/api/collections', {
    method: 'POST',
    body: event.data,
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      reset()
      emit('created', response._data.id)

      // todo: handle success message
    },
  })
}
</script>

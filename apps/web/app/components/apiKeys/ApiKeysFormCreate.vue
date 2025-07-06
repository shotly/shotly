<template>
  <PageCard variant="subtle">
    <PageHeader
      :title="$t('settings.apiKeys.create')"
      :description="$t('settings.apiKeys.createDescription')"
      class="mb-6"
    />

    <UForm
      id="api-keys-form-create"
      ref="form"
      class="grid md:grid-cols-2 gap-3"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <UFormField name="name" :label="$t('common.fields.name')">
        <UInput v-model="state.name" class="w-full" />
      </UFormField>
      <UFormField name="expiresAt" :label="$t('common.fields.expiresAt')">
        <USelect v-model="state.expiresAt" :items="expiresAtOptions" class="w-full" />
      </UFormField>
    </UForm>

    <template #footer-left>
      <I18nT
        keypath="common.help.aboutMore"
        scope="global"
        tag="p"
        class="leading-7 "
      >
        <template #link>
          <ULink
            :href="`${appConfig.links.docs}/api-keys`"
            target="_blank"
            inactive-class="text-secondary border-b"
            external
          >
            {{ $t('settings.apiKeys.title') }}
          </ULink>
        </template>
      </I18nT>
    </template>

    <template #footer-right>
      <UButton
        form="api-keys-form-create"
        :loading="form?.loading"
        type="submit"
        :label="$t('settings.apiKeys.create')"
      />
    </template>
  </PageCard>
</template>

<script setup lang="ts">
import type { ApiKeysCreatePayload as Schema } from '#shared/api'
import type { FormSubmitEvent } from '@nuxt/ui'
import { apiKeysCreatePayloadSchema as schema } from '#shared/api'

export interface ApiKeysFormCreateEmits {
  created: [key: string]
}

const emit = defineEmits<ApiKeysFormCreateEmits>()

const appConfig = useAppConfig()
const { $api } = useNuxtApp()
const form = useTemplateRef('form')

const expiresAtOptions = computed(() => [
  { label: $t('common.date.1d'), value: '1d' },
  { label: $t('common.date.1w'), value: '1w' },
  { label: $t('common.date.1m'), value: '1m' },
  { label: $t('common.date.1y'), value: '1y' },
  { label: $t('common.date.never'), value: 'never' },
])

const { state, reset } = useResettableReactive<Schema>(() => ({
  name: '',
  expiresAt: '1d',
}))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $api('/api/api-keys', {
    method: 'POST',
    body: event.data,
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      reset()
      emit('created', response._data.key)

      // todo: handle success message
    },
  })
}
</script>

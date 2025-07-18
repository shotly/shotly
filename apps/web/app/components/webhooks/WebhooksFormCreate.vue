<template>
  <PageCard variant="subtle">
    <PageHeader
      :title="$t('settings.webhooks.create')"
      :description="$t('settings.webhooks.createDescription')"
      class="mb-6"
    />

    <UForm
      id="webhooks-form-create"
      ref="form"
      class="grid md:grid-cols-2 gap-3"
      :validate-on="['input']"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <UFormField name="url" :label="$t('common.fields.url')">
        <UInput
          v-model="state.url"
          class="w-full"
          :placeholder="$t('common.placeholders.webhookUrl')"
        />
      </UFormField>
      <UFormField name="events" :label="$t('common.fields.events')">
        <USelect
          v-model="state.events"
          :items="eventsOptions"
          :placeholder="$t('common.placeholders.webhookEvents')"
          class="w-full"
          multiple
        />
      </UFormField>
    </UForm>

    <template #footer-left>
      <I18nT
        keypath="common.help.aboutMore"
        scope="global"
        tag="p"
        class="leading-7"
      >
        <template #link>
          <LinkBlank
            :href="appConfig.links.docsWebhook"
            :label="$t('settings.webhooks.title')"
          />
        </template>
      </I18nT>
    </template>

    <template #footer-right>
      <UButton
        form="webhooks-form-create"
        :loading="form?.loading"
        type="submit"
        :label="$t('settings.webhooks.create')"
      />
    </template>
  </PageCard>
</template>

<script setup lang="ts">
import type { WebhooksCreatePayload as Schema } from '#shared/api'
import type { FormSubmitEvent } from '@nuxt/ui'
import { webhooksCreatePayloadSchema as schema } from '#shared/api'

export interface WebhooksFormCreateEmits {
  created: [key: string]
  close: []
}

const emit = defineEmits<WebhooksFormCreateEmits>()

const appConfig = useAppConfig()
const { $api } = useNuxtApp()
const form = useTemplateRef('form')

const eventsOptions = computed(() => [
  { label: $t('settings.webhooks.events.bookmarkCreated'), value: 'bookmarkCreated' },
  { label: $t('settings.webhooks.events.bookmarkDeleted'), value: 'bookmarkDeleted' },
  { label: $t('settings.webhooks.events.collectionCreated'), value: 'collectionCreated' },
  { label: $t('settings.webhooks.events.collectionDeleted'), value: 'collectionDeleted' },
])

const { state, reset } = useResettableReactive<Schema>(() => ({
  url: '',
  events: [],
}))

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $api('/api/webhooks', {
    method: 'post',
    body: event.data,
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      reset()
      emit('created', response._data.secret)

      // todo: handle success message
    },
  })
}
</script>

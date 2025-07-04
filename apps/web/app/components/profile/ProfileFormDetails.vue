<template>
  <PageCard variant="subtle">
    <PageHeader
      :title="$t('profile.details.title')"
      :description="$t('profile.details.description')"
      class="mb-6"
    />

    <UForm
      id="profile-form-details"
      ref="form"
      class="max-w-sm space-y-3"
      :schema="schema"
      :state="state"
      @submit="onSubmit"
    >
      <UFormField name="name" :label="$t('form.fields.userName.label')">
        <UInput
          v-model="state.name"
          :placeholder="$t('form.fields.userName.placeholder')"
          class="w-full"
        />
      </UFormField>
      <UFormField name="email" :label="$t('form.fields.email.label')">
        <UInput
          :model-value="user?.email"
          :placeholder="$t('form.fields.email.placeholder')"
          class="w-full"
          disabled
        />
      </UFormField>
    </UForm>

    <template #footer-right>
      <UButton
        form="profile-form-details"
        :label="$t('form.actions.saveChanges')"
        type="submit"
        :loading="form?.loading"
      />
    </template>
  </PageCard>
</template>

<script setup lang="ts">
import type { ProfileDetailsUpdatePayload as Schema } from '#shared/api'
import type { FormSubmitEvent } from '@nuxt/ui'
import { profileDetailsUpdatePayloadSchema as schema } from '#shared/api'

const { $api } = useNuxtApp()
const { user, fetch: fetchUser } = useUserSession()
const form = useTemplateRef('form')

const state = reactive<Schema>({
  name: user.value?.name ?? '',
})

async function onSubmit(event: FormSubmitEvent<Schema>) {
  await $api('/api/profile/details', {
    method: 'PUT',
    body: event.data,
    onResponse: async ({ response }) => {
      if (response.ok) {
        await fetchUser()
      }

      // todo: handle success message
    },
  })
}
</script>

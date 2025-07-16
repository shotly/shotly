<template>
  <PageCard class="bg-gradient-to-tl from-error/10 from-5% to-default">
    <PageHeader
      :title="$t('settings.profile.dangerZone.title')"
      :description="$t('settings.profile.dangerZone.description')"
    />

    <template #footer-right>
      <ButtonDelete
        :title="$t('settings.profile.dangerZone.deleteAccount')"
        :button-props="{ label: $t('settings.profile.dangerZone.deleteAccount') }"
        :confirm-text="user?.email"
        @confirm="handleDelete()"
      />
    </template>
  </PageCard>
</template>

<script setup lang="ts">
const { $api } = useNuxtApp()
const { user } = useUserSession()
const { logout } = useLogout()

function handleDelete() {
  return $api('/api/profile', {
    method: 'delete',
    onResponse: async ({ response }) => {
      if (!response.ok) {
        return
      }

      await logout()
    },
  })
}
</script>

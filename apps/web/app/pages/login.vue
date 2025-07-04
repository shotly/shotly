<template>
  <div class="w-full max-w-sm">
    <h3 class="text-center text-xl font-semibold text-highlighted mb-8">
      {{ $t('auth.login.title') }}
    </h3>
    <div class="flex flex-col gap-3">
      <UAlert
        v-if="query && query.error"
        color="error"
        variant="subtle"
        class="text-center"
        :title="$t('auth.login.error')"
      />

      <UAlert
        v-if="countAuthProviders === 0"
        color="warning"
        variant="subtle"
        class="text-center"
        :title="$t('auth.login.noAuthProviders')"
      />

      <template v-for="provider in authProviders" :key="provider.id">
        <UButton
          v-if="provider.isEnabled"
          size="lg"
          color="neutral"
          variant="outline"
          class="w-full justify-center"
          :icon="provider.icon"
          :label="provider.label"
          :ui="{ leadingIcon: 'size-4' }"
          loading-auto
          @click="handleOAuth(provider.id)"
        />
      </template>

      <template v-if="allowedAuthProviders.email">
        <USeparator
          v-if="countAuthProviders > 1"
          :label="$t('auth.login.or')"
          :ui="{ container: 'text-muted' }"
        />

        <UButton
          size="lg"
          class="w-full justify-center"
          icon="lucide:mail"
          color="neutral"
          variant="subtle"
          :label="$t('auth.login.continueWithEmail')"
          :ui="{ leadingIcon: 'size-4' }"
        />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'auth',
})

useSeoMeta({
  title: () => $t('auth.login.pageTitle'),
})

const { allowedAuthProviders } = useSiteConfig()
const { query } = useRoute()

function handleOAuth(provider: string) {
  return Promise.all([
    new Promise((resolve) => setTimeout(resolve, 1000)),
    navigateTo(`/auth/${provider}`, { redirectCode: 307, external: true }),
  ])
}

const countAuthProviders = computed<number>(() => {
  const providers = Object.values(allowedAuthProviders)
  return providers.filter(Boolean).length
})

const authProviders = computed(() => [
  {
    id: 'google',
    icon: 'web:google-color',
    label: $t('auth.login.logInWithGoogle'),
    isEnabled: allowedAuthProviders.google,
  },
  {
    id: 'github',
    icon: 'simple-icons:github',
    label: $t('auth.login.logInWithGitHub'),
    isEnabled: allowedAuthProviders.github,
  },
  {
    id: 'authentik',
    icon: 'simple-icons:authentik',
    label: $t('auth.login.logInWithAuthentik'),
    isEnabled: allowedAuthProviders.authentik,
  },
])
</script>

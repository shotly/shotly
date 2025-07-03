<template>
  <div class="w-full max-w-sm">
    <h3 class="text-center text-xl font-semibold text-highlighted mb-8">
      {{ $t('auth.login.title') }}
    </h3>
    <div class="flex flex-col gap-3">
      <UAlert
        v-if="countAuthProviders === 0"
        color="warning"
        variant="subtle"
        class="text-center"
        :title="$t('auth.login.noAuthProviders')"
      />

      <UButton
        v-if="allowedAuthProviders.google"
        size="lg"
        color="neutral"
        variant="outline"
        icon="web:google-color"
        class="w-full justify-center"
        :label="$t('auth.login.logInWithGoogle')"
        :ui="{ leadingIcon: 'size-4' }"
        loading-auto
        @click="handleOAuth('google')"
      />
      <UButton
        v-if="allowedAuthProviders.github"
        size="lg"
        color="neutral"
        variant="outline"
        icon="simple-icons:github"
        class="w-full justify-center"
        :label="$t('auth.login.logInWithGitHub')"
        :ui="{ leadingIcon: 'size-4' }"
        loading-auto
        @click="handleOAuth('github')"
      />

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
</script>

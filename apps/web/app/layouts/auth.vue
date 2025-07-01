<template>
  <div class="relative flex flex-col min-h-dvh items-center justify-between p-6">
    <div class="absolute left-1/2 top-6 size-[160px] -translate-x-1/2 -translate-y-1/2 scale-x-[3] scale-y-[1.5] opacity-20">
      <div class="absolute -inset-5 saturate-[10] rounded-full blur-[40px] bg-primary-gradient" />
    </div>

    <AppLogotype size="lg" class="absolute left-1/2 -translate-x-1/2" />

    <div class="h-24" />

    <slot />

    <div class="text-sm flex items-center text-muted">
      {{ $t('auth.back.label') }}
      <UButton
        color="neutral"
        variant="link"
        icon="lucide:house"
        :label="$t('auth.back.link')"
        :ui="{ leadingIcon: 'size-4' }"
        :to="appConfig.links.home"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()
</script>

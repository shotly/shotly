<template>
  <div class="flex flex-col items-center justify-center h-dvh">
    <UIcon name="shotly:logo" class="size-8" />
    <div class="text-xl mt-4">
      Coming Soon
    </div>
  </div>

  <!--
  <UPageHero
    :title="appConfig.description"
    description="Shotly is a platform for organizing your bookmarks. It's a simple and easy to use tool that allows you to save and organize your bookmarks."
    :links="[
      {
        label: 'Try Demo',
        ui: { base: 'rounded-full text-sm px-5' },
      },
      {
        label: 'Open GitHub',
        variant: 'link',
        trailingIcon: 'lucide:arrow-right',
        ui: { base: 'rounded-full text-sm', trailingIcon: 'size-4.5' },
      },
    ]"
  >
    <template #headline>
      <UButton
        label="See what's new in 0.0.0"
        trailing-icon="lucide:arrow-right"
        color="neutral"
        variant="outline"
        :to="appConfig.links.release"
        :ui="{ base: 'rounded-full', trailingIcon: 'size-4', leadingIcon: 'size-4' }"
      />
    </template>

    <img
      src="https://ui.nuxt.com/templates/dashboard1.png"
      alt="App screenshot"
      class="rounded-lg shadow-2xl ring ring-default"
    >
  </UPageHero>
  -->
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `${appConfig.name} - ${appConfig.description}`,
  titleTemplate: '%s',
})
</script>

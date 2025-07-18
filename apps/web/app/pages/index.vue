<template>
  <UContainer>
    <PageHeader
      title="Home"
      description="Lorem ipsum dolor sit amet consectetur adipisicing elit."
    >
      <template #links>
        <UButton label="Add new bookmark" />
        <!-- <CollectionsControls type="full" /> -->
      </template>
    </PageHeader>
  </UContainer>
</template>

<script setup lang="ts">
const appConfig = useAppConfig()

useSeoMeta({
  title: `${appConfig.name} - ${appConfig.description}`,
  titleTemplate: '%s',
})
</script>

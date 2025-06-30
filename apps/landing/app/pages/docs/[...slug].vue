<template>
  <UPage v-if="page">
    <UPageHeader
      :title="page.title"
      :description="page.description"
    />

    <UPageBody>
      <ContentRenderer v-if="page.body" :value="page" />

      <USeparator class="my-10">
        <div class="flex items-center gap-2 text-sm text-muted">
          <UButton
            size="sm"
            variant="link"
            color="neutral"
            to="https://github.com/shotly/shotly/issues/new/choose"
            target="_blank"
          >
            Report an issue
          </UButton>
          or
          <UButton
            size="sm"
            variant="link"
            color="neutral"
            target="_blank"
            :to="`https://github.com/shotly/shotly/edit/main/content/docs/${page?.stem}.md`"
          >
            Edit this page on GitHub
          </UButton>
        </div>
      </USeparator>

      <UContentSurround :surround="surround" />
    </UPageBody>
  </UPage>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'docs',
})

const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => queryCollection('docs').path(route.path).first())

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('docs', route.path, {
    fields: ['description'],
  })
})

const title = page.value.seo?.title || page.value.title
const description = page.value.seo?.description || page.value.description
const titleTemplate = ref('%s - Shotly Docs')

useSeoMeta({
  title,
  titleTemplate,
  description,
  ogDescription: description,
  ogTitle: titleTemplate.value?.includes('%s') ? titleTemplate.value.replace('%s', title) : title,
})
</script>

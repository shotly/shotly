<template>
  <div class="z-60 overflow-x-hidden sticky top-0 bg-default/75 backdrop-blur lg:ring-1 lg:ring-default lg:fixed lg:right-4 xl:right-8 lg:top-[50%] lg:transform lg:-translate-y-1/2 lg:rounded-lg lg:m-0 lg:py-0 lg:px-4 group">
    <UContentToc
      color="secondary"
      :links="links"
      :ui="{
        root: 'relative bg-transparent backdrop-blur-[initial] top-0',
        title: 'lg:hidden',
        container: 'lg:py-2',
        list: 'mt-2 lg:mt-0',
        item: 'lg:px-0',
        listWithChildren: 'lg:ms-0 lg:group-hover:ms-3',
        link: 'block truncate lg:text-center lg:group-hover:text-left line-clamp-1',
        linkText: `lg:text-[0px] max-w-[160px] lg:group-hover:block lg:group-hover:text-sm lg:before:content-['•'] lg:before:block lg:group-hover:before:hidden lg:before:text-sm`,
      }"
    />
  </div>
</template>

<script setup lang="ts">
import type { TocLink } from '@nuxtjs/mdc'

export interface DocsTocProps {
  links: TocLink[]
}

defineProps<DocsTocProps>()
</script>

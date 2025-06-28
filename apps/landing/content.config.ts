import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection({
      type: 'page',
      source: 'docs/**/*',
      schema: z.object({
        navigation: z.object({
          title: z.string().optional(),
        }),
      }),
    }),
  },
})

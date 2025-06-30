import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      asSeoCollection({
        type: 'page',
        // @todo: replace to `docs/**/*`, after fix https://github.com/nuxt/content/issues/3433
        source: '**',
        schema: z.object({
          navigation: z.object({
            title: z.string().optional(),
          }),
          links: z.array(z.object({
            label: z.string(),
            icon: z.string(),
            to: z.string(),
            target: z.string().optional(),
          })),
        }),
      }),
    ),
  },
})

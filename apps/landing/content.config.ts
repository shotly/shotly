import { defineCollection, defineContentConfig, z } from '@nuxt/content'
import { asSeoCollection } from '@nuxtjs/seo/content'

export default defineContentConfig({
  collections: {
    docs: defineCollection(
      asSeoCollection({
        type: 'page',
        source: 'docs/**/*',
        schema: z.object({
          navigation: z.object({
            title: z.string().optional(),
            badge: z.string().optional(),
            icon: z.string().optional(),
            disabled: z.boolean().optional(),
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

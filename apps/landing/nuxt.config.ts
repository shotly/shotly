export default defineNuxtConfig({
  extends: '@shotly/ui',
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-llms',
  ],
  site: {
    url: 'https://shotly.dev',
    defaultLocale: 'en',
    indexable: true,
  },
  llms: {
    domain: 'https://shotly.dev',
    title: 'Shotly',
    description: 'Bookmarks that work like magic.',
    full: {
      title: 'The complete Shotly documentation written in Markdown (MDC syntax)',
      description: 'The complete Shotly documentation written in Markdown (MDC syntax)',
    },
    sections: [
      {
        title: 'Documentation',
        description: 'Technical documentation and guides',
        contentCollection: 'docs',
        contentFilters: [{ field: 'extension', operator: '=', value: 'md' }],
      },
    ],
  },
  mdc: {
    highlight: {
      theme: {
        dark: 'github-dark',
        default: 'github-dark',
        light: 'github-light',
      },
    },
  },
  css: ['~/assets/css/main.css'],
  $development: {
    site: {
      url: 'http://localhost:3501',
    },
  },
  compatibilityDate: '2025-05-15',
  experimental: {
    typedPages: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: true,
  },
})

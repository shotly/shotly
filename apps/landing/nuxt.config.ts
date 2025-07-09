export default defineNuxtConfig({
  extends: '@shotly/base',
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-og-image',
    'nuxt-llms',
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
    ],
  },
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
  content: {
    build: {
      markdown: {
        highlight: {
          langs: ['bash', 'sh', 'diff', 'json', 'yml', 'mdc', 'md', 'docker', 'dotenv'],
        },
      },
    },
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
  icon: {
    customCollections: [
      { prefix: 'landing', dir: './app/assets/icons' },
    ],
  },
  routeRules: {
    '/': { prerender: true },
    '/docs': { redirect: { statusCode: 301, to: '/docs/getting-started' } },
    '/docs/usage': { redirect: { statusCode: 301, to: '/docs/usage/bookmarks' } },
    '/docs/advanced': { redirect: { statusCode: 301, to: '/docs/advanced/ai-tags' } },
    '/docs/integrations': { redirect: { statusCode: 301, to: '/docs/integrations/n8n' } },
    '/docs/self-hosting': { redirect: { statusCode: 301, to: '/docs/self-hosting/docker' } },
    '/api/stats': { prerender: true },
  },
  nitro: {
    prerender: {
      crawlLinks: true,
      autoSubfolderIndex: false,
    },
  },
  $development: {
    site: {
      url: 'http://localhost:3001',
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

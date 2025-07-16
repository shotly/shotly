export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/image',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-og-image',
    'nuxt-llms',
  ],
  site: {
    url: 'https://shotly.dev',
    defaultLocale: 'en',
    indexable: true,
  },
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
  },
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
      ],
    },
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
        // @ts-expect-error todo: https://github.com/shotly/shotly/issues/98
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
  ui: {
    colorMode: true,
    fonts: true,
  },
  fonts: {
    provider: 'google',
    families: [
      {
        name: 'Geist',
        provider: 'google',
        weights: [300, 400, 500, 600, 700, 800, 900],
      },
      {
        name: 'Geist Mono',
        provider: 'google',
        weights: [400],
      },
    ],
  },
  icon: {
    customCollections: [
      { prefix: 'shotly', dir: './app/assets/icons' },
    ],
    clientBundle: {
      scan: true,
    },
  },
  colorMode: {
    storageKey: 'shotly-color-mode',
  },
  css: ['~/assets/css/main.css'],
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
  compatibilityDate: '2025-07-15',
  experimental: {
    typedPages: true,
  },
  devtools: {
    enabled: true,
  },
})

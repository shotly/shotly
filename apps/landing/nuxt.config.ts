export default defineNuxtConfig({
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-llms',
  ],
  css: ['~/assets/css/main.css'],
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
    clientBundle: {
      scan: true,
    },
  },
  colorMode: {
    storageKey: 'shotly-color-mode',
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

export default defineNuxtConfig({
  extends: ['@shotly/ui'],
  modules: [
    '@nuxt/ui-pro',
    '@nuxt/content',
    '@nuxtjs/seo',
    'nuxt-llms',
  ],
  css: ['~/assets/css/main.css'],
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

import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: '@shotly/ui',
  modules: [
    'nuxt-zod-i18n',
    'nuxt-auth-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    'nuxt-site-config',
  ],
  ssr: false,
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    public: {
      siteUrl: 'https://app.shotly.dev',
      showRepoLink: true,
      showDocsLink: true,
      showHomeLink: true,
    },
    databaseURL: '',
    allowedOrigins: '',
  },
  css: ['~/assets/css/main.css'],
  icon: {
    customCollections: [
      { prefix: 'web', dir: './app/assets/icons' },
    ],
  },
  i18n: {
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    experimental: {
      autoImportTranslationFunctions: true,
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
    },
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
  },
  zodI18n: {
    localeCodesMapping: {
      'en-GB': 'en',
      'ru-RU': 'ru',
    },
  },
  nitro: {
    preset: fileURLToPath(new URL('./server/preset.ts', import.meta.url)),
    experimental: {
      tasks: true,
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

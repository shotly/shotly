import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: [
    'nuxt-zod-i18n',
    'nuxt-auth-utils',
    '@nuxt/ui',
    '@nuxtjs/i18n',
  ],
  ssr: false,
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    databaseURL: '/app/.data/db.sqlite3',
  },
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
  colorMode: {
    storageKey: 'shotly-color-mode',
  },
  i18n: {
    langDir: 'locales',
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

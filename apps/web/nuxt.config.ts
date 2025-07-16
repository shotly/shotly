import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: '@shotly/base',
  modules: [
    'nuxt-auth-utils',
    'nuxt-site-config',
  ],
  i18n: {
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en-US.json' },
      { code: 'ru', language: 'ru-RU', name: 'Русский', file: 'ru-RU.json' },
    ],
  },
  app: {
    head: {
      link: [
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    session: {
      name: 'shotly-session',
    },
    public: {
      siteUrl: 'https://app.shotly.dev',
      showHomeLink: true,
    },
    databaseURL: '',
    allowedOrigins: '',
  },
  icon: {
    customCollections: [
      { prefix: 'web', dir: './app/assets/icons' },
    ],
  },
  nitro: {
    preset: fileURLToPath(new URL('./server/preset.ts', import.meta.url)),
    experimental: {
      tasks: true,
    },
  },
  ssr: false,
  compatibilityDate: '2025-05-15',
  experimental: {
    typedPages: true,
  },
  devtools: {
    enabled: true,
  },
})

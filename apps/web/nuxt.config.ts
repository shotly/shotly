import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  ssr: false,
  modules: [
    'nuxt-zod-i18n',
    'nuxt-auth-utils',
    'nuxt-site-config',
    '@nuxt/ui',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
  ],
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    session: {
      name: 'shotly-session',
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
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
        { rel: 'manifest', href: '/site.webmanifest' },
      ],
    },
  },
  i18n: {
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    experimental: {
      autoImportTranslationFunctions: true,
      localeDetector: 'localeDetector.ts',
    },
    detectBrowserLanguage: {
      useCookie: true,
      alwaysRedirect: true,
      cookieKey: 'shotly-i18n-redirected',
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
      { prefix: 'web', dir: './app/assets/icons' },
    ],
    clientBundle: {
      scan: true,
    },
  },
  colorMode: {
    storageKey: 'shotly-color-mode',
  },
  css: ['~/assets/css/main.css'],
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

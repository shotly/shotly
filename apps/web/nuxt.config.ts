import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  modules: [
    'nuxt-zod-i18n',
    '@nuxt/ui-pro',
    '@nuxt/image',
    '@nuxtjs/i18n',
    '@vueuse/nuxt',
    'nuxt-auth-utils',
    'nuxt-site-config',
  ],
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    // @ts-expect-error https://github.com/atinux/nuxt-auth-utils/blob/main/src/module.ts#L137
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
  app: {
    head: {
      viewport: 'width=device-width, initial-scale=1',
      charset: 'utf-8',
      link: [
        { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'shortcut icon', href: '/favicon.ico' },
        { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
      ],
    },
  },
  components: [
    { path: '~/components/common', pathPrefix: false },
    '~/components',
  ],
  i18n: {
    langDir: 'locales',
    strategy: 'no_prefix',
    defaultLocale: 'en',
    autoDeclare: true,
    experimental: {
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
  nitro: {
    preset: import.meta.dev ? fileURLToPath(new URL('./server/preset.ts', import.meta.url)) : undefined,
    experimental: {
      tasks: true,
    },
  },
  ssr: false,
  compatibilityDate: '2025-07-15',
  experimental: {
    typedPages: true,
  },
  devtools: {
    enabled: true,
  },
})

import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  ssr: false,
  runtimeConfig: {
    nitro: {
      envPrefix: 'APP_',
    },
    databaseURL: '/app/.data/db.sqlite3',
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

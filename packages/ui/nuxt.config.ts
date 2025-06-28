import type { NuxtModule } from '@nuxt/schema'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

function resolvePath(path: string) {
  const currentDir = dirname(fileURLToPath(import.meta.url))

  return join(currentDir, path)
}

export default defineNuxtConfig({
  css: [resolvePath('./app/assets/css/main.css')],
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
      { prefix: 'shotly', dir: resolvePath('./app/assets/icons') },
    ],
    clientBundle: {
      scan: {
        globInclude: ['app/**/*.{vue,ts}'],
        globExclude: ['node_modules', 'dist', 'build', 'coverage', 'test', 'tests', '.*'],
      },
    },
  },
  colorMode: {
    storageKey: 'shotly-color-mode',
  },
  future: {
    compatibilityVersion: 4,
  },
  devtools: {
    enabled: true,
  },
})

/**
 * You cannot pass `@nuxt/ui` in the base layer because it will conflict with `@nuxt/ui-pro`.
 * To avoid a TypeScript error, you need to pass the types from `@nuxt/ui` to `@nuxt/schema`.
 */
declare module '@nuxt/schema' {
  interface NuxtConfig {
    icon?: typeof import('@nuxt/icon').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    fonts?: typeof import('@nuxt/fonts').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    colorMode?: typeof import('@nuxtjs/color-mode').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
    ui?: typeof import('@nuxt/ui').default extends NuxtModule<infer O> ? Partial<O> : Record<string, any>
  }
}

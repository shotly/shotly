export default defineNuxtConfig({
  ssr: false,
  compatibilityDate: '2025-05-15',
  experimental: {
    typedPages: true,
  },
  future: {
    compatibilityVersion: 4,
  },
  devtools: { enabled: true },
})

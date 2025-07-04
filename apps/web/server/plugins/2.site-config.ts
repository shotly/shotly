export default defineNitroPlugin(async (nitroApp) => {
  const appConfig = useAppConfig()
  const runtimeConfig = useRuntimeConfig()

  // Get default values
  const url = runtimeConfig.public.siteUrl
  const name = appConfig.name

  // Check allowed auth providers
  const allowedAuthProviders = {
    google: !!(runtimeConfig.oauth.google.clientId && runtimeConfig.oauth.google.clientSecret),
    github: !!(runtimeConfig.oauth.github.clientId && runtimeConfig.oauth.github.clientSecret),
    authentik: !!(runtimeConfig.oauth.authentik.clientId && runtimeConfig.oauth.authentik.clientSecret && runtimeConfig.oauth.authentik.domain),
    email: false,
  }

  nitroApp.hooks.hook('site-config:init', ({ siteConfig }) => {
    siteConfig.push({
      name,
      url,
      allowedAuthProviders,
    })
  })
})

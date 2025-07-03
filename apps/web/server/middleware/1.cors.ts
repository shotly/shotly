import { withoutTrailingSlash } from 'ufo'

export default defineHttpHandler((event) => {
  const origin = getRequestHeader(event, 'origin')
  const runtimeConfig = useRuntimeConfig(event)

  if (!origin) {
    return
  }

  const allowedOrigins = [
    withoutTrailingSlash(runtimeConfig.public.siteUrl),
    ...runtimeConfig.allowedOrigins
      .split(',')
      .map((origin) => withoutTrailingSlash(origin.trim()))
      .filter(Boolean),
  ]

  if (!allowedOrigins.includes(origin)) {
    throw createError({
      statusCode: 403,
      statusMessage: 'Origin not allowed',
    })
  }

  setResponseHeaders(event, {
    'Access-Control-Allow-Origin': origin,
    'Vary': 'Origin',
  })
})

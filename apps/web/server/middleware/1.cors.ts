export default defineEventHandler((event) => {
  const origin = getRequestHeader(event, 'origin')
  const runtimeConfig = useRuntimeConfig(event)

  if (!origin) {
    return
  }

  const allowedOrigins = [
    runtimeConfig.public.siteUrl,
    ...runtimeConfig.allowedOrigins
      .split(',')
      .map((origin) => origin.trim())
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

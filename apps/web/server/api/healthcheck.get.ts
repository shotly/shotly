export default defineHttpHandler(() => {
  throw createHttpError('forbidden')
})

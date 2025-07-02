export default defineEventHandler(async () => {
  const stars = await cachedGHStars()

  return {
    stars,
  }
})

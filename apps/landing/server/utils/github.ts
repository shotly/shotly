function normalizeStarsCount(count: number): string {
  if (count < 1000) {
    return count.toString()
  }

  return `${(count / 1000).toFixed(count % 1000 === 0 ? 0 : 1)}k`
}

export const cachedGHStars = defineCachedFunction(async () => {
  try {
    const data: any = await $fetch(`https://api.github.com/repos/shotly/shotly`)

    return normalizeStarsCount(data.stargazers_count)
  } catch (error) {
    console.error(error)
  }

  return ''
}, {
  maxAge: 60 * 60,
  name: 'ghStars',
  getKey: () => 'ghStars',
})

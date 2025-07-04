export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    async onResponseError() {
      // todo: handle error
    },
  })

  return {
    provide: {
      api,
    },
  }
})

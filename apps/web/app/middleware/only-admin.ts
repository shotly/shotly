export default defineNuxtRouteMiddleware(async () => {
  const { user } = useUserSession()

  if (user.value?.role !== 'admin') {
    return navigateTo({ name: 'index' })
  }
})

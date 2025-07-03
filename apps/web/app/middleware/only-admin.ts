export default defineNuxtRouteMiddleware(async () => {
  const { user } = useUserSession()

  // If the user is not an admin, redirect to the index page
  if (user.value?.role !== 'admin') {
    return navigateTo({ name: 'index' })
  }
})

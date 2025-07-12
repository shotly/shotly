import { REDIRECT_TO_COOKIE } from '#shared/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie(REDIRECT_TO_COOKIE)
  const { loggedIn } = useUserSession()

  // If the user is already logged in and the route is the login page, redirect to the index page
  if (to.name === 'login' && loggedIn.value) {
    return navigateTo({ name: 'index' })
  }

  // If the user is not logged in and the route is the login page, do nothing
  if (to.name === 'login' && !loggedIn.value) {
    return
  }

  // If the user is not logged in and the route is not the login page, redirect to the login page
  if (!loggedIn.value) {
    cookie.value = encodeURIComponent(to.fullPath)

    return navigateTo({ name: 'login' })
  }
})

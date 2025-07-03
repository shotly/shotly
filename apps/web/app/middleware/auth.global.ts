import { REDIRECT_TO_COOKIE } from '#shared/auth'

export default defineNuxtRouteMiddleware(async (to) => {
  const cookie = useCookie(REDIRECT_TO_COOKIE)
  const { loggedIn } = useUserSession()

  if (loggedIn.value || to.name === 'login') {
    return
  }

  cookie.value = encodeURIComponent(to.fullPath)

  return navigateTo({ name: 'login' })
})

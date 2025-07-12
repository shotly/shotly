export default defineNuxtRouteMiddleware(async () => {
  const { loggedIn } = useUserSession()
  const { status, execute } = useCollections()

  if (loggedIn.value && status.value === 'idle') {
    await execute()
  }
})

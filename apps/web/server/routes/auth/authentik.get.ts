import { logger } from '#shared/logger'

export default defineOAuthAuthentikEventHandler({
  onSuccess: async (event, { user }) => {
    await processOAuthFlow(event, 'authentik', {
      name: user.name,
      email: user.email,
      avatarUrl: user.picture,
    })

    return sendRedirect(event, getAuthRedirectTo(event))
  },
  onError: (event, error) => {
    logger.error(error.message)

    return sendRedirect(event, `/login?error=${error.message}`)
  },
})

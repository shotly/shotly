import { logger } from '#shared/logger'

export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['profile', 'email'],
  },
  onSuccess: async (event, { user }) => {
    await processOAuthFlow(event, 'google', {
      name: user.name,
      email: user.email,
      avatarUrl: user.picture,
    })

    return sendRedirect(event, getAuthRedirectTo(event))
  },
  onError: (event, error) => {
    logger.error(`Google OAuth error: ${error.message}`)

    return sendRedirect(event, `/login?error=${error.message}`)
  },
})

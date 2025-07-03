import { logger } from '#shared/logger'

export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  onSuccess: async (event, { user }) => {
    await processOAuthFlow(event, 'github', {
      name: user.name,
      email: user.email || '',
      avatarUrl: user.avatar_url,
    })

    return sendRedirect(event, getAuthRedirectTo(event))
  },
  onError: (event, error) => {
    logger.error(error.message)

    return sendRedirect(event, `/login?error=${error.message}`)
  },
})

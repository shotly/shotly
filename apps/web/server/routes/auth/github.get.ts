export default defineOAuthGitHubEventHandler({
  config: {
    emailRequired: true,
  },
  onSuccess: async () => {
    // ...
  },
  onError: () => {
    // ...
  },
})

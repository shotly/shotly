export default defineOAuthGoogleEventHandler({
  config: {
    scope: ['profile', 'email'],
  },
  onSuccess: async () => {
    // ...
  },
  onError: () => {
    // ...
  },
})

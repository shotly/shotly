export default defineAppConfig({
  uiPro: {
    pageHeader: {
      slots: {
        title: 'font-extrabold tracking-tight text-2xl sm:text-3xl',
      },
      variants: {
        title: {
          true: {
            description: 'mt-2',
          },
        },
      },
    },
  },
})

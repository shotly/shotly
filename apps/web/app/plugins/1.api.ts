export default defineNuxtPlugin(() => {
  const api = $fetch.create({
    async onResponseError({ response }) {
      const { $i18n: { t } } = useNuxtApp()

      useToast().add({
        title: t('common.error.title') as string,
        description: response._data.message ?? t('common.error.message'),
        color: 'error',
        icon: 'lucide:circle-x',
      })
    },
  })

  return {
    provide: {
      api,
    },
  }
})

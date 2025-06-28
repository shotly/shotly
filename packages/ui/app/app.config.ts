export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  social: {
    github: 'https://github.com/shotly',
    docs: 'https://shotly.dev/docs',
  },

  icon: {
    aliases: {
      'lang-ru': 'circle-flags:ru',
      'lang-en': 'circle-flags:uk',
    },
  },

  ui: {
    colors: {
      primary: 'black',
      neutral: 'neutral',
    },

    icons: {
      loading: 'lucide:loader',
    },
  },
})

export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  links: {
    docs: 'https://shotly.dev/docs',
    llms: 'https://shotly.dev/llms.txt',
  },

  social: {
    github: 'https://github.com/shotly',
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

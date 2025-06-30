export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  links: {
    app: 'https://app.shotly.dev',
    docs: 'https://shotly.dev/docs',
    llms: 'https://shotly.dev/llms.txt',
    release: 'https://github.com/shotly/shotly/releases',
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
      neutral: 'zinc',
      info: 'sky',
      warning: 'orange',
      error: 'pink',
    },

    icons: {
      loading: 'lucide:loader',
    },

    button: {
      base: 'cursor-pointer',
    },
  },
})

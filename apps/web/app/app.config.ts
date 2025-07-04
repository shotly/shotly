export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  links: {
    home: 'https://shotly.dev',
    docs: 'https://shotly.dev/docs',
    repository: 'https://github.com/shotly/shotly',
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
      error: 'rose',
    },

    icons: {
      loading: 'lucide:loader',
    },

    button: {
      slots: {
        base: 'cursor-pointer',
      },
    },

    navigationMenu: {
      variants: {
        orientation: {
          vertical: {
            link: 'py-2',
          },
        },
      },
    },
  },
})

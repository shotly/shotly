export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  links: {
    home: 'https://shotly.dev',
    app: 'https://app.shotly.dev',
    llms: 'https://shotly.dev/llms.txt',
    repository: 'https://github.com/shotly/shotly',
  },

  ui: {
    colors: {
      primary: 'black',
      secondary: 'blue',
      neutral: 'zinc',
      info: 'sky',
      warning: 'orange',
    },

    icons: {
      loading: 'lucide:loader',
    },
  },
  uiPro: {
    prose: {
      codeIcon: {
        'docker-compose.yml': 'simple-icons:docker',
      },
      a: {
        base: 'border-b border-secondary',
      },
    },
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
    pageHero: {
      slots: {
        title: 'text-4xl text-balance',
        description: 'text-balance',
        headline: 'mb-8',
      },
    },
    contentNavigation: {
      slots: {
        trigger: 'font-medium text-default!',
        listWithChildren: 'border-0 ms-0',
        linkLeadingIcon: 'size-4',
        linkTrailingIcon: 'size-4',
      },
    },
  },
})

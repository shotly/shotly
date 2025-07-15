export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  links: {
    home: 'https://shotly.dev',
    app: 'https://app.shotly.dev',
    docs: 'https://shotly.dev/docs',
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

    button: {
      slots: {
        base: 'cursor-pointer',
      },
      defaultVariants: {
        size: 'lg',
      },
    },

    input: {
      defaultVariants: {
        size: 'lg',
      },
    },

    modal: {
      slots: {
        content: 'divide-y-0 dark:ring-accented/50',
        body: 'bg-muted',
        header: 'relative after:w-full after:h-px after:bg-accented dark:after:bg-accented/70 after:left-0 after:absolute after:bottom-0',
        footer: 'bg-muted',
        overlay: 'backdrop-blur-xs',
      },
      variants: {
        fullscreen: {
          false: {
            content: 'max-w-md',
          },
        },
      },
    },

    select: {
      variants: {
        size: {
          md: {
            base: 'py-2 px-3',
          },
        },
      },
    },

    selectMenu: {
      defaultVariants: {
        size: 'lg',
      },
    },

    navigationMenu: {
      slots: {
        linkTrailingIcon: 'size-4',
      },

      variants: {
        orientation: {
          vertical: {
            link: 'py-2',
          },
        },
      },
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

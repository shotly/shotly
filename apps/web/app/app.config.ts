export default defineAppConfig({
  name: 'Shotly',
  description: 'Bookmarks that work like magic.',

  links: {
    home: 'https://shotly.dev',
    app: 'https://app.shotly.dev',
    docs: 'https://shotly.dev/docs',
    repository: 'https://github.com/shotly/shotly',

    // docs
    docsApiKeys: 'https://shotly.dev/docs/advanced/api-keys',
    docsWebhook: 'https://shotly.dev/docs/advanced/webhooks',
    docsShareCollection: 'https://shotly.dev/docs/advanced/share-collection',
    docsCollections: 'https://shotly.dev/docs/collections',
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
})

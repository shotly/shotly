<template>
  <UDropdownMenu
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      v-bind="{
        ...user,
        label: user?.name,
      }"
      color="neutral"
      variant="ghost"
      class="data-[state=open]:bg-elevated"
      trailing-icon="lucide:chevrons-up-down"
      block
      :ui="{ trailingIcon: 'text-dimmed' }"
    />
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const colorMode = useColorMode()
const appConfig = useAppConfig()
const runtimeConfig = useRuntimeConfig()
const { locale, locales, setLocale } = useI18n()
// const { user: userSession } = useUserSession()
const { logout, isLoading: isLoggingOut } = useLogout()
const { isShortcutsHelpOpen } = useApp()

const user = ref({
  name: 'Hywax',
  avatar: {
    src: createAvatar('Hywax'),
    alt: 'Hywax',
  },
})

const appearance = computed(() => [
  { label: $t('appearance.system'), value: 'system', icon: 'lucide:monitor' },
  { label: $t('appearance.light'), value: 'light', icon: 'lucide:sun' },
  { label: $t('appearance.dark'), value: 'dark', icon: 'lucide:moon' },
])

const items = computed<DropdownMenuItem[][]>(() => ([
  [
    {
      label: $t('settings.title'),
      icon: 'lucide:settings',
      kbds: [','],
      to: { name: 'settings' },
    },
  ],
  [
    {
      label: $t('appearance.theme'),
      icon: 'lucide:palette',
      children: appearance.value.map((item) => ({
        label: item.label,
        icon: item.icon,
        type: 'checkbox',
        checked: colorMode.preference === item.value,
        onSelect: (e) => {
          e.preventDefault()
          colorMode.preference = item.value
        },
      })),
    },
    {
      label: $t('i18n.language'),
      icon: 'lucide:globe',
      children: locales.value.map((loc) => ({
        label: loc.name,
        icon: `lang-${loc.code}`,
        type: 'checkbox',
        checked: loc.code === locale.value,
        onSelect: (e) => {
          e.preventDefault()
          setLocale(loc.code)
        },
      })),
    },
  ],
  [
    {
      label: $t('shortcuts.title'),
      icon: 'lucide:keyboard',
      kbds: ['?'],
      onSelect: () => isShortcutsHelpOpen.value = true,
    },
    ...(
      runtimeConfig.public.showDocsLink
        ? [{
            label: $t('links.docs'),
            icon: 'lucide:book-open',
            target: '_blank',
            to: appConfig.links.docs,
          }]
        : []
    ),
    ...(
      runtimeConfig.public.showRepoLink
        ? [{
            label: $t('links.github'),
            icon: 'simple-icons:github',
            target: '_blank',
            to: appConfig.social.github,
          }]
        : []
    ),
  ],
  [
    {
      label: $t('auth.logout.label'),
      icon: 'lucide:log-out',
      loading: isLoggingOut.value,
      onSelect: () => logout(),
    },
  ],
]))
</script>

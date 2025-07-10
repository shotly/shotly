<template>
  <UDropdownMenu
    v-if="user"
    :items="items"
    :content="{ align: 'center', collisionPadding: 12 }"
    :ui="{ content: 'w-(--reka-dropdown-menu-trigger-width)' }"
  >
    <UButton
      :label="user.name"
      :avatar="{ src: userAvatar }"
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
const { locale, locales, setLocale } = useI18n()
const { user } = useUserSession()
const { logout, isLoading: isLoggingOut } = useLogout()
const { isShortcutsHelpOpen } = useApp()

const userAvatar = computed(() => {
  if (!user.value?.avatarUrl) {
    return createAvatar(user.value?.name)
  }

  return user.value.avatarUrl
})

const appearance = computed(() => [
  { label: $t('common.appearance.system'), value: 'system', icon: 'lucide:monitor' },
  { label: $t('common.appearance.light'), value: 'light', icon: 'lucide:sun' },
  { label: $t('common.appearance.dark'), value: 'dark', icon: 'lucide:moon' },
])

const items = computed<DropdownMenuItem[][]>(() => ([
  [
    ...(
      user.value?.role === 'admin'
        ? [{
            label: $t('admin.title'),
            icon: 'lucide:shield-check',
            to: { name: 'admin' },
          }] as const
        : []
    ),
    {
      label: $t('settings.title'),
      icon: 'lucide:settings',
      kbds: [','],
      to: { name: 'settings' },
    },
  ],
  [
    {
      label: $t('common.appearance.theme'),
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
      label: $t('common.i18n.language'),
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
    {
      label: $t('common.links.docs'),
      icon: 'lucide:book-open',
      target: '_blank',
      to: appConfig.links.docs,
    },
    {
      label: $t('common.links.github'),
      icon: 'simple-icons:github',
      target: '_blank',
      to: appConfig.links.repository,
    },
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

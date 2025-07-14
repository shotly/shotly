<template>
  <ModalBrand
    :title="$t('collections.share.title')"
    :description="$t('collections.share.description')"
  >
    <template #body>
      <div>
        <p>Share modal</p>
      </div>
    </template>
  </ModalBrand>
</template>

<script setup lang="ts">
import type { CUID } from '#shared/api'

export interface CollectionsShareModalProps {
  id: CUID
  isShared: boolean
}

defineProps<CollectionsShareModalProps>()
</script>

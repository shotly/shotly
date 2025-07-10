<template>
  <UModal
    v-model:open="isCollectionsFormCreateModalOpen"
    :title="$t('collections.create.title')"
    :description="$t('collections.create.description')"
    :ui="{
      footer: 'justify-end bg-elevated/50',
    }"
  >
    <template #body>
      <UForm>
        <UFormGroup :label="$t('collections.create.name')" name="name">
          <UInput />
        </UFormGroup>
      </UForm>
    </template>

    <template #footer>
      <UButton :label="$t('common.actions.done')" @click="emit('close')" />
    </template>
  </UModal>
</template>

<script setup lang="ts">
export interface CollectionsFormCreateModalEmits {
  close: []
}

const emit = defineEmits<CollectionsFormCreateModalEmits>()

const { isCollectionsFormCreateModalOpen } = useApp()
</script>

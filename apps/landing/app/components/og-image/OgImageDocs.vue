<template>
  <div class="size-full flex bg-[#18181b] text-[#ededed] p-10 relative">
    <div v-if="headline" class="mb-4">
      <span class="uppercase text-[18px] font-semibold text-[#eeae93] bg-[#27272a] py-3 px-4 rounded-lg">
        {{ headline }}
      </span>
    </div>
    <h1 class="m-0 text-[75px] font-semibold mb-2 flex items-center">
      <span>{{ title }}</span>
    </h1>
    <p v-if="description" class="text-[32px] text-[#9f9fa9] leading-tight text-balance max-w-4xl">
      {{ description.slice(0, 200) }}
    </p>
    <div class="absolute bottom-10 left-10">
      <div class="flex flex-row items-center gap-4">
        <UIcon name="shotly:logo-symbol" mode="svg" class="h-7 w-4.5" />
        <div class="text-xl font-semibold">
          Shotly.dev
        </div>
      </div>
    </div>
    <UIcon
      v-if="icon"
      :name="icon"
      mode="svg"
      class="size-50 absolute bottom-10 right-10 opacity-50 text-[#5d5d62]"
    />
  </div>
</template>

<script setup lang="ts">
export interface OgImageDocsProps {
  title?: string
  description?: string
  headline?: string
  icon?: string
}

defineOptions({
  inheritAttrs: false,
})

defineProps<OgImageDocsProps>()
</script>

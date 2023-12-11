<template>
  <div
    :class="[
      `h-[25px] w-[25px] rounded-[5px] grid place-content-center cursor-pointer`,
      `transition-all duration-200 hover:bg-white/10 active:opacity-60`,
    ]"
  >
    <UIcon :name="$props.icon" class="text-[15px]" />
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{ icon: string }>()
</script>

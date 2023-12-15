<template>
  <div
    v-if="show"
    v-motion="$props.motionKey!"
    class="bg-black bg-opacity-20 fixed top-0 bottom-0 left-0 right-0 grid place-content-center z-[99]"
    :initial="{
      opacity: 0,
      y: 10,
      transition: {
        duration: 150,
      },
    }"
    :enter="{
      opacity: 1,
      y: 0,
      transition: {
        ease: 'easeOut',
      },
    }"
    :leave="{
      opacity: 0,
      y: 10,
      transition: {
        ease: 'easeOut',
      },
    }"
    @click="leave"
  >
    <div
      class="bg-white min-h-[200px] flex flex-col rounded-md py-[20px] gap-[20px]"
      :style="{
        width:
          typeof $props.width === 'number' ? `${$props.width}px` : $props.width,
      }"
      @click.stop
    >
      <div class="flex items-center px-[20px]">
        <span class="text-[#333] font-bold text-[15px] select-none">{{
          $props.title
        }}</span>
        <div class="ml-auto text-red-500 cursor-pointer" @click="leave">
          <font-awesome-icon :icon="['fas', 'xmark']" />
        </div>
      </div>
      <template v-if="$props.content">
        <component :is="$props.content(h)" />
      </template>
      <template v-if="$props.footer">
        <component :is="$props.footer(h)" />
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useMotions } from '@vueuse/motion'
import { onMounted, ref, h } from 'vue'

type DialogProps = {
  title: string
  content?: (h: any) => VNode
  footer?: (h: any) => VNode
  width?: string | number
  appendToBody?: boolean
  onClose?: (key: string) => void
  motionKey?: string
}

const show = ref(false)
const motion = useMotions()
const props = withDefaults(defineProps<DialogProps>(), {
  title: '',
})

onMounted(() => {
  show.value = true
})

const leave = () => {
  motion[props.motionKey!].leave(() => {
    show.value = false
    props.onClose?.(props.motionKey!)
  })
}

defineExpose({
  leave,
})
</script>

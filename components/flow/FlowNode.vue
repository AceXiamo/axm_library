<template>
  <Handle id="b" type="target" :position="Position.Left" />
  <div
    :class="[
      `bg-gray-900 min-w-[300px] p-[10px_16px] rounded-md box-border border border-solid flex flex-col`,
      store.node.id === $props.node.id
        ? 'border-emerald-500'
        : 'border-transparent',
    ]"
    :style="{
      backgroundColor: nodeData.bgColor,
    }"
  >
    <div class="flex gap-[10px]">
      <div class="flex flex-auto w-0 flex-col gap-[5px]">
        <span class="text-white text-[14px]">{{ nodeData.label }}</span>
        <span class="text-white/50 text-[12px]">{{ nodeData.desc }}</span>
      </div>
      <div class="w-max flex flex-col gap-[5px]">
        <NodeButton icon="i-heroicons-pencil-square" class="text-purple-400" />
        <NodeButton
          icon="i-heroicons-squares-plus"
          class="text-green-400"
          @click="addChild"
        />
      </div>
    </div>
  </div>
  <Handle id="a" type="source" :position="Position.Right" />
</template>

<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { useFlowStore } from '~/store/flowStore'
import type { FlowItem } from '.'

const props = defineProps<{ node: NodeProps }>()
const emits = defineEmits(['addNode'])
const nodeData = props.node.data || {}
const store = useFlowStore()

const addChild = () => {
  const id = Math.random().toString(36).substr(2, 5)
  const node: FlowItem = {
    id,
    pid: nodeData.id,
    label: `node ${id}`,
    desc: '一段文字介绍/详情',
    bgColor: '#101827',
    children: [],
  }

  emits('addNode', node)
}
</script>

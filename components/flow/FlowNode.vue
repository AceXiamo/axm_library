<template>
  <Handle id="b" type="target" :position="Position.Left" />
  <div
    :class="[
      `bg-gray-900 min-w-[100px] p-[10px_16px] text-center rounded-md box-border border border-solid`,
      store.node?.id === $props.data.id ? 'border-emerald-500' : 'border-transparent',
    ]"
  >
    <span class="text-white">{{ $props.data.label }}</span>
  </div>
  <Handle id="a" type="source" :position="Position.Right" />
</template>

<script setup lang="ts">
import type { NodeProps } from '@vue-flow/core'
import { Position, Handle } from '@vue-flow/core'
import { useFlowStore } from '~/store/flowStore';

const props = defineProps<{ data: NodeProps }>()
const store = useFlowStore()
</script>

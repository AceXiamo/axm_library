<template>
  <VueFlow
    @nodesChange="save"
    @edgesChange="save"
    @paneClick="paneClickHandle"
    v-model="elements"
    @nodeClick="nodeClick"
  >
    <template #node-custom="customNodeProps">
      <FlowNode :data="customNodeProps"></FlowNode>
    </template>
  </VueFlow>
  <FlowForm
    v-if="flowStore.showForm"
    v-motion="`flow_form`"
    :initial="{
      opacity: 0,
      x: 5,
    }"
    :enter="{
      opacity: 1,
      x: 0,
      transition: {
        duration: 200,
        ease: `easeOut`,
      },
    }"
    :leave="{
      opacity: 0,
      x: 5,
      transition: {
        duration: 200,
        ease: `easeOut`,
      },
    }"
  />
</template>

<script lang="ts" setup>
import { VueFlow, useVueFlow } from '@vue-flow/core'
import { useFlowStore } from '@/store/flowStore'
import {
  resetToDefaultNodeStyle,
  resetToDefaultEdgeStyle,
} from '@/utils/flow'
import { useMotions } from '@vueuse/motion'

const flowStore = useFlowStore()
const motions = useMotions()

const nodeClick = (e: any) => {
  const { node } = e
  flowStore.node = node
  flowStore.showForm = true
}

const { addEdges, onConnect, onPaneReady, toObject, nodes, edges } =
  useVueFlow()

onConnect((params) => addEdges(params))

const elements = ref<any>([
  {
    id: '1',
    label: 'node 1',
    type: 'custom',
    position: { x: 100, y: 500 },
  },
  {
    id: '2',
    type: 'custom',
    label: 'node 2',
    position: { x: 500, y: 400 },
  },
  {
    id: '3',
    type: 'custom',
    label: 'node 3',
    position: { x: 500, y: 600 },
  },
  {
    id: 'e1-2',
    target: '2',
    source: '1',
  },
  {
    id: 'e2-3',
    target: '3',
    source: '2',
  },
])

onPaneReady(({ fitView }) => {
  flowStore.nodes = nodes.value
  flowStore.edges = edges.value
})

const save = () => {
  const data = toObject()
}

const paneClickHandle = () => {
  flowStore.node = {}
  motions['flow_form']?.leave(() => {
    flowStore.showForm = false
  })
  resetToDefaultNodeStyle(nodes.value)
  resetToDefaultEdgeStyle(edges.value)
}
</script>

<template>
  <VueFlow
    @nodesChange="save"
    @edgesChange="save"
    @paneClick="
      () => {
        // hide form
        motions['flow_form']?.leave(() => {
          flowStore.node = {}
        })
        // clear selected style
        resetToDefaultNodeStyle(nodes)
        resetToDefaultEdgeStyle(edges)
      }
    "
    v-model="elements"
    @nodeClick="nodeClick"
  />
  <FlowForm
    v-if="flowStore.node.id"
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
  nodeSelectStyleHandle,
  resetToDefaultNodeStyle,
  resetToDefaultEdgeStyle,
} from '@/utils/flow'
import { useMotions } from '@vueuse/motion'

const flowStore = useFlowStore()
const motions = useMotions()

const nodeClick = (e: any) => {
  const { node } = e
  nodeSelectStyleHandle(node, nodes.value, edges.value)
  flowStore.node = node
}

const { addEdges, onConnect, onPaneReady, toObject, nodes, edges } =
  useVueFlow()

onConnect((params) => addEdges(params))

const elements = ref<any>([
  {
    id: '1',
    label: 'node 1',
    position: { x: 100, y: 500 },
  },
  {
    id: '2',
    label: 'node 2',
    position: { x: 500, y: 400 },
  },
  {
    id: '3',
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
  //
})

const save = () => {
  const data = toObject()
}
</script>

<template>
  <VueFlow
    @nodesChange="save"
    @edgesChange="save"
    @paneClick="paneClickHandle"
    v-model="elements"
    @nodeClick="nodeClick"
  >
    <template #node-custom="customNodeProps">
      <FlowNode :node="customNodeProps" @addNode="addNode"></FlowNode>
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
import { resetToDefaultNodeStyle, resetToDefaultEdgeStyle } from '@/utils/flow'
import { useMotions } from '@vueuse/motion'
import { flowData } from './index'
import type { FlowItem } from './index'

const flowStore = useFlowStore()
const motions = useMotions()

const nodeClick = (e: any) => {
  const { node } = e
  flowStore.node = node
}

const {
  addEdges,
  onConnect,
  onPaneReady,
  toObject,
  nodes,
  edges,
  fitView,
  setState,
  $reset,
} = useVueFlow()

onConnect((params) => addEdges(params))

const elements = ref<any>([])

onPaneReady(({ fitView }) => {
  flowStore.nodes = nodes.value
  flowStore.edges = edges.value
  fitView()
})

const save = () => {
  const data = toObject()
}

const paneClickHandle = () => {
  flowStore.node = {
    data: {
      bgColor: '#101827',
    },
  }
  motions['flow_form']?.leave(() => {
    flowStore.showForm = false
  })
  resetToDefaultNodeStyle(nodes.value)
  resetToDefaultEdgeStyle(edges.value)
}

const addNode = (data: FlowItem) => {
  const pNode = nodes.value.find((item) => item.id === data.pid)?.data
  if (!pNode.children) pNode.children = []
  pNode.children.push(data)
  flowNodes.value = []
  flattenNodes(flowData)
  console.log(flowNodes.value)
  elements.value = flowNodes.value
}

type NodeData = {
  id: string
  type?: string
  position?: {
    x: number
    y: number
  }
  data?: {
    label: string
    desc: string
    bgColor: string
  }
  target?: string
  source?: string
}

const NODE_WIDTH = 300,
  NODE_HEIGHT = 77,
  GAP = 50

const generateUniqueId = () => Math.random().toString(36).substr(2, 9)

const flowNodes = ref<NodeData[]>([])
function flattenNodes(
  data: FlowItem[],
  level: number = 0,
  parentNode?: FlowItem
) {
  data.forEach((item, index) => {
    let lastY = 0
    if (index === 0) lastY += parentNode?.position?.y_min || 0
    else lastY += (data[index - 1].position?.y_max || 0) + GAP

    item.position = {
      y_min: lastY,
      y_max: lastY + NODE_HEIGHT,
    }

    if (item.children) flattenNodes(item.children, level + 1, item)

    const x = level * (NODE_WIDTH + GAP)
    const y = calculateYPosition(item, lastY)
    let node: NodeData = {
      id: item.id!,
      type: 'custom',
      position: { x, y },
      data: item,
    }
    flowNodes.value.push(node)
    if (parentNode) {
      parentNode.position!.y_max = Math.max(
        parentNode.position!.y_max,
        item.position.y_max
      )
      const edge = {
        id: generateUniqueId(),
        source: parentNode.id,
        target: node.id,
      }
      flowNodes.value.push(edge)
    }
  })
}

const calculateYPosition = (item: FlowItem, lastY: number) => {
  if (item.children && item.children.length > 1) {
    return (
      item.position!.y_min +
      (item.position!.y_max - item.position!.y_min - NODE_HEIGHT) / 2
    )
  } else {
    return lastY
  }
}

onMounted(() => {
  flattenNodes(flowData)
  elements.value = flowNodes.value
})
</script>

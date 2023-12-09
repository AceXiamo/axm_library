import { defineStore } from 'pinia'
import type { GraphEdge, GraphNode } from '@vue-flow/core'

export const useFlowStore = defineStore('flow', () => {
  const node = ref<any>()
  const showForm = ref(false)
  const nodes = ref<GraphNode[]>([])
  const edges = ref<GraphEdge[]>([])

  watch(
    () => node.value,
    (value) => {
      if (value)
        edges.value.forEach((edge) => {
          if (edge.source === value?.id || edge.target === value?.id) {
            edge.style = {
              stroke: '#10b981',
            }
            edge.animated = true
          } else {
            edge.style = defaultEdgeStyle
            edge.animated = false
          }
        })
    }
  )

  return { node, showForm, nodes, edges }
})

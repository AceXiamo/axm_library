import type { Styles, GraphEdge, GraphNode } from '@vue-flow/core'

export const defaultEdgeStyle: Styles = {
  stroke: '#fff',
  strokeWidth: '1px',
}

export const resetToDefaultNodeStyle = (nodes: GraphNode[]) => {
  nodes.forEach((node) => {
    node.style = {
      ...node.style,
      border: '1px solid transparent',
    }
  })
}

export const resetToDefaultEdgeStyle = (edges: GraphEdge[]) => {
  edges.forEach((edge) => {
    edge.style = defaultEdgeStyle
    edge.animated = false
  })
}

export const nodeSelectStyleHandle = (node: GraphNode, nodes: GraphNode[], edges: GraphEdge[]) => {
  resetToDefaultNodeStyle(nodes)
  edges.forEach((edge) => {
    if (edge.source === node.id || edge.target === node.id) {
      edge.style = {
        stroke: '#10b981',
      }
      edge.animated = true
    } else {
      edge.style = defaultEdgeStyle
      edge.animated = false
    }
  })
  node.style = {
    ...node.style,
    border: '1px solid #10b981',
  }
}

import { defineStore } from 'pinia'
import type { GraphNode } from '@vue-flow/core'

export const useFlowStore = defineStore('flow', () => {
  const node = ref<any>({
    id: '',
    label: '',
    style: {
      background: '',
    },
  })

  return { node }
})

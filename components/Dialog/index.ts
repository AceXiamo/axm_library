import { type VNode, h, render } from 'vue'
import Component from '@/components/Dialog/component.vue'

export type DialogProps = {
  title: string
  content?: (h: any) => VNode
  footer?: (h: any) => VNode
  width?: string | number
  appendToBody?: boolean
  onClose?: (key: string) => void
  motionKey?: string
}
export type DialogInstance = {
  close: () => void
} | null

const hooks: { key: string; fun: () => void }[] = []
const onEsc = (e: KeyboardEvent) => {
  if (e.key === 'Escape') {
    const last = hooks.pop()
    last?.fun()
    removeListenVerify()
  }
}

const removeListenVerify = () => {
  if (hooks.length < 1) {
    window.removeEventListener('keydown', onEsc)
  }
}

const generateKey = (): string => {
  return `dialog_` + Math.random().toString(36).substr(2, 8)
}

const init = (props: DialogProps, onClose?: () => void): DialogInstance => {
  const div = document.createElement('div')
  document.body.appendChild(div)
  const motionKey = generateKey()
  const vNode = h(Component, {
    ...props,
    onClose: (key: string) => {
      const index = hooks.findIndex(item => item.key === key)
      if (index > -1) {
        hooks.splice(index, 1)
      }
      removeListenVerify()
      render(null, div)
      div.remove()
      onClose?.()
    },
    motionKey
  })
  const nuxtApp = useNuxtApp()
  vNode.appContext = nuxtApp.vueApp._context
  render(vNode, div)
  hooks.push({
    key: motionKey,
    fun: vNode.component?.exposed!.leave
  })
  window.addEventListener('keydown', onEsc)

  return {
    close: vNode.component?.exposed!.leave
  }
}

export default { init }

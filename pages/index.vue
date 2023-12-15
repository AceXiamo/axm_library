<template>
  <div class="w-screen h-screen flex bg-black/90 p-5">
    <div class="flex-auto flex flex-col gap-3">
      <div class="flex justify-between">
        <UBreadcrumb :links="links" />
        <div class="flex items-center gap-5">
          <UButton size="xs" color="violet" variant="soft" @click="addTopNode"
            >增加顶级节点</UButton
          >
        </div>
      </div>
      <div class="flow-container flex-auto relative">
        <ClientOnly>
          <Flow />
        </ClientOnly>
      </div>
    </div>
  </div>
</template>

<script lang="tsx" setup>
import Dialog from '@/components/Dialog'
const autoSave = ref(true)

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/',
  },
  {
    label: 'Navigation',
    icon: 'i-heroicons-square-3-stack-3d',
  },
  {
    label: 'Breadcrumb',
    icon: 'i-heroicons-link',
  },
]

function DialogContent() {
  return <></>
}

const addTopNode = () => {
  Dialog.init({
    title: '新增顶级节点',
    width: 500,
    content: () => <DialogContent />,
  })
}
</script>

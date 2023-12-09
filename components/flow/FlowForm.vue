<template>
  <div
    class="absolute m-3 top-0 right-0 bg-black border border-white/10 w-[200px] min-h-[50px] rounded-md p-5"
  >
    <UForm :state="flowStore.node" class="space-y-4">
      <UFormGroup label="Label">
        <UInput v-model="flowStore.node.label" />
      </UFormGroup>
      <UFormGroup label="BackgroundColor">
        <UInput v-model="flowStore.node.style.background" type="color" />
      </UFormGroup>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { useFlowStore } from '@/store/flowStore'
const flowStore = useFlowStore()
</script>


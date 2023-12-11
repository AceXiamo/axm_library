<template>
  <div
    class="absolute m-3 top-0 right-0 bg-black border border-white/10 w-[300px] min-h-[50px] rounded-md p-5"
  >
    <UForm :state="flowStore.node.data" class="space-y-4">
      <UFormGroup label="Label">
        <UInput v-model="flowStore.node.data.label" />
      </UFormGroup>
      <UFormGroup label="Desc">
        <UTextarea v-model="flowStore.node.data.desc" />
      </UFormGroup>
      <UFormGroup label="BackgroundColor">
        <UInput v-model="flowStore.node.data.bgColor" type="color" />
      </UFormGroup>
    </UForm>
  </div>
</template>

<script lang="ts" setup>
import { useFlowStore } from '@/store/flowStore'
const flowStore = useFlowStore()
</script>

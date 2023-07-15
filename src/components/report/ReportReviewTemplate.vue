<script setup>
/* eslint-disable no-unused-vars */
import { checkReport } from '@/composables/useReport'

// define props
const props = defineProps({
  checklist: {
    type: Object,
    required: true
  },
  reportData: {
    type: String,
    required: true
  }
})

// check report
const { items, flags } = checkReport(props.reportData)
</script>

<template>
  <div id="report-items-review" class="flex flex-col gap-3">
    <div v-for="(item, index) of items" :key="index">
      <div v-show="flags[index]"
        class="bg-white border-white p-3 shadow-md cursor-pointer border-2 rounded-lg min-w-6">
        <p>
          {{ checklist[index].itemText }}
        </p>
        <p class="text-sm font-semibold">
          {{ checklist[index].itemOptions[item].label }}
        </p>
      </div>
    </div>
  </div>
</template>

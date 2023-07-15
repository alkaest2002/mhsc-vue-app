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
  <div id="report-items-review">
    <div v-for="(item, index) of items" :key="index">
      <div v-show="flags[index]" class="mb-2 p-1 border-b border-sky-900">
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

<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import { processAndFlagReport } from '@/composables/useReport'

// get i18n t
const { t } = useI18n()

// define props
const props = defineProps({
  checklist: {
    type: Object,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  flags: {
    type: Array,
    required: true
  }
})
</script>

<template>
  <div id="report-items-review" class="flex flex-col justify-items-start gap-3">
    <template v-for="(item, index) of items" :key="index">
      <template v-if="flags[index]">
        <div class="bg-white border-white p-3 shadow-md cursor-pointer border-2 rounded-lg min-w-6">
          <p>
            {{ checklist[index].itemText }}
          </p>
          <p class="text-sm font-semibold">
            {{ t('views.reviewReport.userAnswered', { answer:  checklist[index].itemOptions[item].label}) }} 
          </p>
        </div>
      </template>
    </template>
  </div>
</template>

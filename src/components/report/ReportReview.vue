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
  reportData: {
    type: String,
    required: true
  }
})

// check report
const { items, flags } = processAndFlagReport(props.reportData)

const noFlaggedItems = flags.filter(Boolean).length === 0
</script>

<template>
  <div id="report-items-review" class="flex flex-col justify-items-start gap-3">
    <template v-if="noFlaggedItems">
      <p>{{ t('views.reviewReport.noFlaggedItems') }}</p>
    </template>
    <template v-else v-for="(item, index) of items" :key="index">
      <template v-if="flags[index]">
        <div class="bg-white border-white p-3 shadow-md cursor-pointer border-2 rounded-lg min-w-6">
          <p>
            {{ checklist[index].itemText }}
          </p>
          <p class="text-sm font-semibold">
            {{ checklist[index].itemOptions[item].label }}
          </p>
        </div>
      </template>
    </template>
  </div>
</template>

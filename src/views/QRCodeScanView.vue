<script setup>
import { useReportStore } from '@/stores/report.store'
import { storeToRefs } from 'pinia'
import { i18n } from '@/i18n'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
// import locale-aware report
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.json`)
// get reportStore props
const { checklist, report } = storeToRefs(useReportStore())
// store locale-aware checklist
checklist.value = checklistModule.default
// store locale-aware report
report.value = reportModule.default
</script>

<template>
  <router-view />
</template>

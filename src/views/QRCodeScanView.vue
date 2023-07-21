<script setup>
import { onBeforeMount } from 'vue'
import { useReportStore } from '@/stores/report.store'
import { useAppStore } from '@/stores/app.store'
import { storeToRefs } from 'pinia'
import { i18n } from '@/i18n'
import QrScanner from 'qr-scanner'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
// import locale-aware report
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.json`)
// get appStore props
const { deviceHasCamera } = storeToRefs(useAppStore())
// get reportStore props
const { checklist, report } = storeToRefs(useReportStore())
// store locale-aware checklist
checklist.value = checklistModule.default
// store locale-aware report
report.value = reportModule.default

// on before mount
onBeforeMount(async () => (deviceHasCamera.value = await QrScanner.hasCamera()))
</script>

<template>
  <router-view />
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, watch, computed, onMounted } from 'vue'
import { i18n } from '@/i18n'
import { useReportStore } from '../stores/report.store'
import { storeToRefs } from 'pinia'
import { checkQRCode, renderReport, getReport } from '@/composables/useReport'
import QrScanner from 'qr-scanner'
import QRCode__start from '@/components/qrcode/QRCode__start.vue'
import QRCode__endWithoutReview from '@/components/qrcode/QRCode__endWithoutReview.vue'
import QRCode__endWithReview from '@/components/qrcode/QRCode__endWithReview.vue'
import QRCodeScanner from '@/components/qrcode/QRCode__scan.vue'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = checklistModule.default

// import locale-aware report template
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.json`)
const report = reportModule.default

// get reportStore prop
const { reportData, renderedReport, reviewReport } = storeToRefs(useReportStore())
// define device has camera
const deviceHasCamera = ref(true)
// define isLoading state
const isLoading = ref(false)
// define command prop
const scannerCommand = ref(null)
// define qrcode
const qrcode = ref(null)

// compute which component to show
const qrcodeComponent = computed(() => {
  console.log(reviewReport)
  if (scannerCommand.value === 'stop' && qrcode.value !== null && !reviewReport.value)
    return QRCode__endWithoutReview
  if (scannerCommand.value === 'stop' && qrcode.value !== null && reviewReport.value) return QRCode__endWithReview
  return QRCode__start
})

// watch qrcode
watch(qrcode, (data) => {
  // if qrcode is valid
  if (checkQRCode(data)) {
    // store report data
    reportData.value = data
    // render report and store it
    renderedReport.value = renderReport(checklist, report, data)
    // stop the camera
    scannerCommand.value = 'stop'
  }
})

// on request report
const onRequestReport = () => {
  // get report
  getReport(reportData, renderedReport, isLoading)
  // reset scanner command
  scannerCommand.value = null
  // reset qrcode
  qrcode.value = null
}

// on mounted
onMounted(async () => {
  // flag whether device has camera or not
  deviceHasCamera.value = await QrScanner.hasCamera()
})
</script>

<template>
  <div class="h-full">
    <component
      v-show="scannerCommand !== 'start'"
      :is="qrcodeComponent"
      v-model:is-loading="isLoading"
      v-model:scanner-command="scannerCommand"
      :device-has-camera="deviceHasCamera"
      :report-data="reportData"
      :rendered-report="renderedReport"
      :checklist="checklist"
      @on-request-report="onRequestReport"
    />
    <QRCodeScanner
      v-show="scannerCommand === 'start'"
      v-model:is-loading="isLoading"
      v-model:scanner-command="scannerCommand"
      v-model:qrcode="qrcode"
      :rendered-report="renderedReport"
    />
  </div>
</template>

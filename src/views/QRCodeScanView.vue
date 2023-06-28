<script setup>
/* eslint-disable no-unused-vars */
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import QrScanner from 'qr-scanner'
import { renderReport, downloadReport } from '@/composables/useRenderReport'
import QRCodeScanner from '@/components/qrcode/QRCodeScanner.vue'
import QRCodePlaceholder from '@/components/qrcode/QRCodePlaceholder.vue'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = checklistModule.default

// import locale-aware report template
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.json`)
const report = reportModule.default

// get i18n t
const { t } = useI18n()
// define device has camera
const deviceHasCamera = ref(true)
// define isLoading state
const isLoading = ref(false)
// define command prop
const scannerCommand = ref(null)
// define scanned status
const scannerStatus = ref('idle')
// define qrcode
const qrcode = ref(null)
// define rendered report
const renderedReport = ref(null)

// watch qrcode
watch(qrcode, (reportData) => {
  // validation pattern
  const pat = /([A-Za-z' ]+;){2}(\d{2}){1,2}[-/]\d{2}[-/](\d{2}){1,2};([012];){10}([0123];){5}([01];){5}\d\d?/gm
  // if qrcode was acquired and is valid
  if (reportData !== null && reportData.match(pat)?.length > 0) {
    // render report and store it
    renderedReport.value = renderReport(checklist, report, reportData)
    // stop the camera
    scannerCommand.value = 'stop'
  }
})

// on download report
const onDownloadReport = () => {
  // start spinner
  isLoading.value = true
  // download report
  downloadReport(renderedReport.value, isLoading)
  // delete qrcode
  qrcode.value = null
  // delete rendered report
  renderedReport.value = null
  // stop spinner
  isLoading.value = false
}

// on mounted
onMounted(async () => {
  // flag whether device has camera or not
  deviceHasCamera.value = await QrScanner.hasCamera()
})
</script>

<template>
  <div class="h-full">
    <QRCodePlaceholder
      v-show="scannerCommand !== 'start'"
      v-model:is-loading="isLoading"
      v-model:scanner-command="scannerCommand"
      :device-has-camera="deviceHasCamera"
      :rendered-report="renderedReport"
      @on-download-report="onDownloadReport"
    />
    <QRCodeScanner
      v-show="scannerCommand === 'start'"
      v-model:is-loading="isLoading"
      v-model:scanner-command="scannerCommand"
      v-model:scanner-status="scannerStatus"
      v-model:qrcode="qrcode"
      :rendered-report="renderedReport"
    />
  </div>
</template>

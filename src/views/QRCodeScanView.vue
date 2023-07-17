<script setup>
/* eslint-disable no-unused-vars */
import { ref, watch, computed, onMounted } from 'vue'
import { i18n } from '@/i18n'
import { useReportStore } from '../stores/report.store'
import { storeToRefs } from 'pinia'
import { checkQRCode, renderReport, getReport, processAndFlagReport } from '@/composables/useReport'
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
// define items prop
const items = ref([])
// defing flags prop
const flags = ref([])

// compute which component to show
const qrcodeComponent = computed(() => {
  if (qrcode.value !== null) {
    if (!reviewReport.value) return QRCode__endWithoutReview
    if (reviewReport.value && flags.value.filter(Boolean).length == 0) return QRCode__endWithoutReview
    if (reviewReport.value && flags.value.filter(Boolean).length > 0) return QRCode__endWithReview
  }
  // default component
  return QRCode__start
})

// watch qrcode
watch(qrcode, (data) => {
  // if qrcode is valid
  if (checkQRCode(data)) {
    // store report data
    reportData.value = data
    // store rendered report
    renderedReport.value = renderReport(checklist, report, data)
    // process and flag report
    const { items: reportItems, flags: reportFlags } = processAndFlagReport(data)
    // set items
    items.value = reportItems
    // set flags
    flags.value = reportFlags
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
      :device-has-camera="deviceHasCamera"
      :items="items"
      :flags="flags"
      :rendered-report="renderedReport"
      :checklist="checklist"
      v-model:is-loading="isLoading"
      v-model:scanner-command="scannerCommand"
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

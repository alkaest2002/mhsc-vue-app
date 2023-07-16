<script setup>
/* eslint-disable no-unused-vars */
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { i18n } from '@/i18n'
import { useReportStore } from '../stores/report.store'
import { storeToRefs } from 'pinia'
import { checkQRCode, renderReport, getReport } from '@/composables/useReport'
import QrScanner from 'qr-scanner'
import QRCodeScanner from '@/components/qrcode/QRCodeScanner.vue'
import QRCodePlaceholder from '@/components/qrcode/QRCodePlaceholder.vue'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = checklistModule.default

// import locale-aware report template
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.json`)
const report = reportModule.default

// get router
const router = useRouter()
// get reportStore prop
const { reportData, renderedReport, reviewReport } = storeToRefs(useReportStore())
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

// on after report was generated
const onAfterReport = () => {
  // if report should be reviwed
  if (reviewReport.value) {
    // go to review page
    router.push({ name: 'review-report'})
  // otherwise
  } else {
    // render report
    getReport(reportData, renderedReport, isLoading)
    // go to qrcode scan
    router.push({ name: 'qrcode-scan' })
  }
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
      @on-after-report="onAfterReport"
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

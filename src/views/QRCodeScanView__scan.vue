<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useReportStore } from '@/stores/report.store'
import { storeToRefs } from 'pinia'
import QrScanner from 'qr-scanner'
import { checkQRCode, renderReport, processAndFlagReport } from '@/composables/useReport'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = checklistModule.default

// import locale-aware report template
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.json`)
const report = reportModule.default

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// get reportStore prop
const { reportData, renderedReport, reviewReport } = storeToRefs(useReportStore())
// define qrcode
const qrcode = ref(null)
// define video element ref
const scannerElement = ref(null)

// define scanner
const qrScanner = ref(null)

// watch qrcode
watch(qrcode, (data) => {
  // if qrcode is valid
  if (checkQRCode(data)) {
    // store report data
    reportData.value = data
    // store rendered report
    renderedReport.value = renderReport(checklist, report, data)
    // process and flag report
    const { flags } = processAndFlagReport(data)
    // go to relevant view
    if (reviewReport.value && flags.length === 0) return router.push({ name: 'qrcocde-scan-end' })
    if (reviewReport.value) return router.push({ name: 'qrcode-scan-review' })
    router.push({ name: 'qrcode-scan-end' })
  }
})

// init scanner on mount
onMounted(() => {
  // wait a bit
  setTimeout(() => {
    qrScanner.value = new QrScanner(
      scannerElement.value,
      async (result) => {
        qrcode.value = window.atob(result?.data)
      },
      { onDecodeError: () => { }, highlightScanRegion: true }
    )
    // start scanner
    qrScanner.value.start()
  }, 500)
})

onUnmounted(() => {
  qrScanner.value?.destroy()
})
</script>

<template>
  <AppContainer>
    <template #title>
      <div class="text-center">
        {{ t('views.qrcodeScan.title') }}
      </div>
    </template>
    <template #content>
      <div class="relative">
        <div class="text-center mb-6">
          <p>{{ t('views.qrcodeScan.text') }}</p>
        </div>
        <video id="video" ref="scannerElement" class="rounded-md relative" />
      </div>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'qrcode-scan-start' }" :class="'w-full'">
        {{ t('ui.button.scannerStop') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>

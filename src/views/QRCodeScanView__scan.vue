<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useReportStore } from '@/stores/report.store'
import { storeToRefs } from 'pinia'
import QrScanner from 'qr-scanner'
import { checkQRCode, renderReport, processAndFlagReport } from '@/composables/useReport'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// get pinia reportStore
const reportStore = useReportStore()
// get reportStore props
const { checklist, report, reviewReport, highlightPositiveItems } = storeToRefs(reportStore)
// define qrcode
const qrcode = ref(null)
// define video element ref
const videoElement = ref(null)
// define scanner
const qrScanner = ref(null)

// watch qrcode
watch(qrcode, async (data) => {
  // if qrcode is valid
  if (checkQRCode(data)) {
    // stop qrcode scanner
    await qrScanner.value.stop()
    qrScanner.value.destroy()
    qrScanner.value = null;
    // process and flag data
    const { name, surname, birthWhen, answers, flags } = processAndFlagReport(data)
    // init data object to store
    const obj = {
      name,
      surname,
      birthWhen,
      answers,
      flags,
      reportData: data,
      renderedReport: renderReport(checklist.value, report.value, data, highlightPositiveItems.value)
    }
    // patch repostStore with qrcode data
    reportStore.$patch(obj)
    // go to relevant view
    if (!reviewReport.value || (reviewReport.value && flags.length === 0))
      return router.push({ name: 'qrcocde-scan-end' })
    return router.push({ name: 'qrcode-scan-review' })
  }
})

// on mount
onMounted(() => {
  setTimeout(() => {
    // init qrcode scanner
    qrScanner.value = new QrScanner(
      videoElement.value,
      async (result) => qrcode.value = window.atob(result?.data),
      { onDecodeError: () => {}, highlightScanRegion: true }
    )
    // start qrcode scanner
    qrScanner.value.start()
  }, 500)
})

// on unomount
onUnmounted(() => {
  // destroy qrcode scanner
  qrScanner.value?.destroy()
  qrScanner.value = null;
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
        <video id="video" ref="videoElement" class="rounded-md relative" />
      </div>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'qrcode-scan-start' }" :class="'w-full'">
        {{ t('ui.button.scannerStop') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>

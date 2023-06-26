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
  // if qrcode was acquired
  if (reportData !== null) {
    // stop the camera
    scannerCommand.value = 'stop'
    // render report and store it
    renderedReport.value = renderReport(checklist, report, reportData)
  }
})

// on download report
const onDownloadReport = () => {
  // download report
  downloadReport(renderedReport.value, isLoading)
  // delete qrcode
  qrcode.value = null
  // delete rendered report
  renderedReport.value = null
}

// on mounted
onMounted(async () => {
  // flag whether device has camera or not
  deviceHasCamera.value = await QrScanner.hasCamera()
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
      <div class="text-center mb-6">
        <p v-if="!deviceHasCamera">{{ t('views.qrcodeScan.scanner.noCamera') }}</p>
        <p v-else>{{ t('views.qrcodeScan.text') }}</p>
      </div>
      <div class="relative grow">
        <QRCodeScanner
          v-model:scanner-command="scannerCommand"
          v-model:qrcode="qrcode"
          v-model:is-loading="isLoading"
          v-model:scanner-status="scannerStatus"
        />
        <QRCodePlaceholder
          v-if="scannerCommand !== 'start'"
          :class="{
            absolute: scannerStatus == 'idle' || scannerCommand == 'stop',
            'top-0': scannerStatus == 'idle' || scannerCommand == 'stop',
            'h-full': scannerStatus == 'idle' || scannerCommand == 'stop'
          }"
          :scanner-command="scannerCommand"
          :qrcode="qrcode"
        />
      </div>
    </template>
    <template #footer>
      <div v-if="deviceHasCamera">
        <LoadingButton
          v-show="scannerStatus === 'active' && renderedReport === null"
          :css="'w-full mb-2'"
          :is-loading="isLoading"
          @click="scannerCommand = 'stop'"
        >
          {{ t('ui.button.scannerStop') }}
        </LoadingButton>
        <LoadingButton
          v-show="scannerStatus == 'idle' && renderedReport === null"
          :css="'w-full mb-2'"
          :is-loading="isLoading"
          @click="scannerCommand = 'start'"
        >
          {{ t('ui.button.scannerStart') }}
        </LoadingButton>
        <LoadingButton
          v-show="renderedReport !== null"
          :class="'w-full'"
          :is-loading="isLoading"
          @click.prevent="onDownloadReport"
        >
          {{ t('ui.button.printQRCode') }}
        </LoadingButton>
      </div>
      <div v-else>
        <RouterLinkButton :to="{ name: 'start' }" :class="'w-full mt-2'">
          {{ t('ui.button.back') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

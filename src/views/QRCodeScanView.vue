<script setup>
/* eslint-disable no-unused-vars */
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import QrScanner from 'qr-scanner'
import { renderReport, downloadReport } from '@/composables/useRenderReport'
import QRCodeScanner from '@/components/qrcode/QRCodeScanner.vue'
import QRCodePlaceholder from '@/components/qrcode/QRCodePlaceholder.vue'

// import locale-aware report template
const reportModule = await import(`@/i18n/locales/report.${i18n.global.locale.value}.rtf?raw`)
const reportTemplate = reportModule.default

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklistJSON = checklistModule.default

const mockData = "Calanna;Pierpaolo;15/11/1971;-1;1;2;0;0;0;0;0;0;0;0;1;2;3;0;0;1;0;0;0;6"

// get i18n t
const { t } = useI18n()
// define device has camera
const deviceHasCamera = ref(true)
// init isLoading state
const isLoading = ref(false)
// set qrcode
const qrcode = ref(null)
// define command prop
const scannerCommand = ref(null)
// define scanned status
const scannerStatus = ref('idle')
// define rendered report
const renderedReport = ref(null)
// watch qrcode
watch(
  qrcode,
  (reportData) => {
    if (reportData !== null)
    renderedReport.value = renderReport(reportTemplate, reportData, checklistJSON)
  }
)

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
  qrcode.value = mockData
})
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcodeScan.title') }}
    </template>
    <template #content>
      <p v-if="!deviceHasCamera">{{ t('views.qrcodeScan.scanner.noCamera') }}</p>
      <p v-else class="mb-6">{{ t('views.qrcodeScan.text') }}</p>
      <div class="relative">
        <QRCodeScanner
          v-model:scanner-command="scannerCommand"
          v-model:qrcode="qrcode"
          v-model:is-loading="isLoading"
          v-model:scanner-status="scannerStatus"
        />
        <QRCodePlaceholder 
          v-if="scannerStatus == 'idle' || scannerCommand == 'stop'"
          class="absolute top-0 left-[17%]"
          :scanner-command="scannerCommand" 
          :qrcode="qrcode" 
        />
      </div>
    </template>
    <template #footer>
      <div v-if="deviceHasCamera">
        <LoadingButton
          v-show="scannerStatus == 'active' && renderedReport === null"
          :css="'w-full mb-2'"
          :is-loading="isLoading"
          @click="scannerCommand = 'stop'"
        >
          {{ t('ui.button.cameraStop') }}
        </LoadingButton>
        <LoadingButton
          v-show="scannerStatus == 'idle' && renderedReport === null"
          :css="'w-full mb-2'"
          :is-loading="isLoading"
          @click="scannerCommand = 'start'"
        >
          {{ t('ui.button.cameraStart') }}
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

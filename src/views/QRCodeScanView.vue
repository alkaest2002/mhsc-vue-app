<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import QrScanner from 'qr-scanner'
import QRCodeScanner from '@/components/qrcode/QRCodeScanner.vue'

// import locale-aware checklist
const module = await import(`@/i18n/locales/report.${i18n.global.locale.value}.rtf?raw`)
const report = module.default

// get i18n
const { t } = useI18n()
// define device has camera
const deviceHasCamera = ref(true)
// init isLoading state
const isLoading = ref(false)
// set qrcode
const qrcode = ref(null)
// define command prop
const scannerCommand = ref(null)
// define scanne status
const scannerStatus = ref('idle')

// define on click report
const onClickReport = () => {
  // create new blob
  const blob = new Blob([report], { type: 'palin/txt' })
  // create fake link
  const link = document.createElement('a')
  // add href attribute to fake link
  link.href = URL.createObjectURL(blob)
  // add download attribute to fake link
  link.download = 'report.rtf'
  // click fake link
  link.click()
  // revoke object url
  URL.revokeObjectURL(link.href)
  // remove a
  link.remove()
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
      {{ t('views.qrcodeScan.title') }}
    </template>
    <template #content>
      <QRCodeScanner
        v-if="deviceHasCamera"
        :scannerCommand="scannerCommand"
        v-model:qrcode="qrcode"
        v-model:is-loading="isLoading"
        v-model:scanner-status="scannerStatus"
      />
      <p v-else>{{ t('views.qrcodeScan.scanner.noCamera') }}</p>
    </template>
    <template #footer>
      <div v-if="deviceHasCamera">
        <LoadingButton
          v-show="scannerStatus == 'active'"
          :css="'w-full mb-2'"
          :is-loading="isLoading"
          @click="scannerCommand = 'stop'"
        >
          {{ t('ui.button.cameraStop') }}
        </LoadingButton>
        <LoadingButton
          v-show="scannerStatus == 'idle'"
          :css="'w-full mb-2'"
          :is-loading="isLoading"
          @click="scannerCommand = 'start'"
        >
          {{ t('ui.button.cameraStart') }}
        </LoadingButton>
        <a
          class="inline-block outline-yellow-400 bg-yellow-400 hover:bg-yellow-300 text-sky-800 h-10 py-2 px-4 rounded w-full text-center cursor-pointer"
          @click.prevent="onClickReport"
        >
          {{ t('ui.button.printQRCode') }}
        </a>
      </div>
      <div v-else>
        <RouterLinkButton :to="{ name: 'start' }" :class="'w-full mt-2'">
          {{ t('ui.button.back') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

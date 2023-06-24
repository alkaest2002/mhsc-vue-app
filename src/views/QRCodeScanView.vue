<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'
import QRCodeScanner from '@/components/qrcode/QRCodeScanner.vue'

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

// define qrcode
const onClickReport = () => {
  console.log('click Report')
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
        <LoadingButton
          :css="'w-full'"
          :color="'green'"
          :disabled="!qrcode"
          :is-loading="isLoading"
          @click="onClickReport"
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

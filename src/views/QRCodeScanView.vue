<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'
import Qrcode from 'qrcode.vue';

// get i18n
const { t } = useI18n()
// define scanner
const qrScanner = ref(null)
// define qrcode
const qrCode = ref(null)
// define video element ref
const videoElem = ref(null)
// init isLoading state
const isLoading = ref(false)

// watch qrcode
watch(qrCode, () => qrScanner.value.stop())

// on mounter
onMounted(() => {
  // create scanner instace
  qrScanner.value = new QrScanner(
    videoElem.value, 
    (result) => qrCode.value = window.atob(result?.data),
    { onDecodeError: () => {}}
  )
  console.log(qrScanner.value._active)

})

// on click start camera
const onClickStartCamera = async () => {
  isLoading.value = true
  await qrScanner.value.start()
  isLoading.value = false
}

// on click stop camera
const onClickStopCamera= async () => {
  isLoading.value = true
  qrScanner.value.stop()
  isLoading.value = false
}

// on clicl generate report
const onClickReport = () => {
  console.log('generate report')
}
// stop scanner onUnmount
onUnmounted(() => qrScanner.value.stop())

</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcodeScan.title') }}
    </template>
    <template #content>
      <p class="block mb-6">{{ t('views.qrcodeScan.text') }}</p>
      <video id="video" ref="videoElem" class="border-2 border-sky-800 p-3 rounded w-full border-dashed relative" />
      <div class="mt-3" v-if="qrCode">
        {{ t('views.qrcodeScan.scanner.done') }}
      </div>
      <div class="mt-3" v-if="qrScanner?._active">
        {{ t('views.qrcodeScan.scanner.pending') }}
      </div>
    </template>
    <template #footer>
      <LoadingButton v-if="qrScanner?._active" :css="'w-full mb-2'" :is-loading="isLoading"  @click="onClickStopCamera">
        {{ t('ui.button.cameraStop') }}
      </LoadingButton>
      <LoadingButton v-else :css="'w-full mb-2'" :is-loading="isLoading"  @click="onClickStartCamera">
        {{ t('ui.button.cameraStart') }}
      </LoadingButton>
      <LoadingButton :css="'w-full'" :color="'green'" :disabled="!qrCode" :is-loading="isLoading" @click="onClickReport">
        {{ t('ui.button.printQRCode') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

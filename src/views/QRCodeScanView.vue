<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted, onUnmounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get i18n
const { t } = useI18n()
// define scanner
const qrScanner = ref(null)
// define qrcode
const qrCode = ref(null)
// define video element ref
const videoElem = ref(null)

// watch qrcode
watch(qrCode, () => qrScanner.value.stop())

// on mounter
onMounted(() => {
  // create scanner instace
  qrScanner.value = new QrScanner(videoElem.value, (result) => {
    console.log(result)
    qrCode.value = window.atob(result)}
  )
  // start scanner
  qrScanner.value.start();
})

// stop scanner onUnmount
onUnmounted(() => qrScanner.value.stop())

</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcodeScan.title') }}
    </template>
    <template #content>
      <p class="mb-3">{{ t('views.qrcodeScan.text') }}</p>
      <video id="video" ref="videoElem" class="border-2 border-sky-800 p-2 rounded w-full"></video>
      <div>
        {{ qrCode }}
      </div>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'bio' }" :class="'w-full mt-2'">
        {{ t('ui.button.continue') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>

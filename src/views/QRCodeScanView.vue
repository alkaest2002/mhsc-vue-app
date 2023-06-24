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
// on mounted
onMounted(async () => {
  // flag whether device has camera or not
  deviceHasCamera.value = await QrScanner.hasCamera()
})
</script>

<template>
  <QRCodeScanner v-if="deviceHasCamera" />
  <AppContainer v-else>
    <template #title>
      {{ t('views.qrcodeScan.title') }}
    </template>
    <template #content>
      {{ t('views.qrcodeScan.scanner.noCamera') }}
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'start' }" :class="'w-full mt-2'">
        {{ t('ui.button.back') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>

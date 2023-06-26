<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconQRCode from '@/components/icons/IconQRCode.vue'
// get i18n t
const { t } = useI18n()

// define props
const props = defineProps({
  scannerCommand: {
    type: [null, String],
    default: null
  },
  qrcode: {
    type: String,
    default: ''
  }
})
</script>

<template>
  <div class="flex justify-center items-center bg-zinc-100 w-full">
    <div v-if="!qrcode" class="flex flex-col items-center">
      <IconCamera class="w-[150px]" />
      <span class="text-sm">{{ t('views.qrcodeScan.scanner.start') }}</span>
    </div>
    <div v-else class="flex flex-col items-center">
      <IconQRCode class="w-[150px]" />
      <span class="text-sm">{{ t('views.qrcodeScan.scanner.done') }}</span>
    </div>
  </div>
</template>

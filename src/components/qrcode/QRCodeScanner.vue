<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, onUnmounted, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'

// get i18n
const { t } = useI18n()

// define props
const props = defineProps({
  scannerCommand: {
    type: [null, String],
    default: null
  },
  isLoading: {
    type: Boolean,
    required: true
  },
  qrCode: {
    type: String,
    default: ''
  },
  scannerStatus: {
    type: String,
    required: true
  }
})

// define emits
const emit = defineEmits(['update:isLoading', 'update:qrcode', 'update:scannerStatus'])

// define video element ref
const scannerElement = ref(null)

// define scanner
const qrScanner = ref(null)

// watch scanner command
watch(
  () => props.scannerCommand,
  (command) => {
    if (command == 'start') onClickStartCamera()
    if (command == 'stop') onClickStopCamera()
  }
)

// on click start camera
const onClickStartCamera = async () => {
  // start scanner
  await qrScanner.value.start()
  // stop spinner
  emit('update:isLoading', false)
  // update scanner status
  emit('update:scannerStatus', 'active')
}

// on click stop camera
const onClickStopCamera = async () => {
  await qrScanner.value.stop()
  // stop spinner
  emit('update:isLoading', false)
  // update scanner status
  emit('update:scannerStatus', 'idle')
}

// init scanner on mount
onMounted(() => {
  // create scanner instance
  qrScanner.value = new QrScanner(
    scannerElement.value,
    (result) => emit('update:qrcode', window.atob(result?.data)),
    { onDecodeError: () => {}, highlightScanRegion: true }
  )
})

// destroy scanner onUnmount
onUnmounted(() => qrScanner.value.destroy())
</script>

<template>
  <div>
    <p class="block mb-6">{{ t('views.qrcodeScan.text') }}</p>
    <div class="mt-3 mb-2 text-sm">
      <span v-show="!qrCode && !qrScanner?._active">{{ t('views.qrcodeScan.scanner.start') }}</span>
      <span v-show="!qrCode && qrScanner?._active">{{ t('views.qrcodeScan.scanner.pending') }}</span>
      <span v-show="qrCode">{{ t('views.qrcodeScan.scanner.done') }}</span>
    </div>
    <video
      id="video"
      ref="scannerElement"
      class="rounded-lg w-full"
    />
  </div>
</template>

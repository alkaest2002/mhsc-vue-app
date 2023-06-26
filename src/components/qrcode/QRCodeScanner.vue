<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'

// get i18n t
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
  qrcode: {
    type: String,
    default: ''
  },
  scannerStatus: {
    type: String,
    required: true
  }
})

// define emits
const emit = defineEmits(['update:scannerCommand', 'update:scannerStatus', 'update:qrcode', 'update:isLoading'])

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
</script>

<template>
  <video id="video" ref="scannerElement" class="rounded-md"  />    
</template>

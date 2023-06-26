<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, watch, onMounted, onUnmounted } from 'vue'
import QrScanner from 'qr-scanner'

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
const emit = defineEmits([
  'update:scannerCommand',
  'update:scannerStatus',
  'update:qrcode',
  'update:isLoading',
])

// define video element ref
const scannerElement = ref(null)

// define scanner
const qrScanner = ref(null)

// watch scanner command
watch(
  () => props.scannerCommand,
  (command) => {
    if (command == 'start') onClickStartScanner()
    if (command == 'stop') onClickStopScanner()
  }
)

// on click start scanner
const onClickStartScanner = async () => {
  // start scanner
  await qrScanner.value.start()
  // stop spinner
  emit('update:isLoading', false)
  // update scanner status
  emit('update:scannerStatus', 'active')
}

// on click stop scanner
const onClickStopScanner = async () => {
  // stop scanner
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

// on unmounted
onUnmounted(() => {
  // destroy scanner
  qrScanner.value.destroy()
  // set scanner to null
  qrScanner.value = null
})
</script>

<template>
  <video id="video" ref="scannerElement" class="rounded-md" />
</template>

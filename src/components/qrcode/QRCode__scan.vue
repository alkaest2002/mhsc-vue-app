<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, watch, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'

// get i18n t
const { t } = useI18n()

// define props
const { scannerCommand } = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  },
  scannerCommand: {
    type: [null, String],
    required: true
  },
  qrcode: {
    type: String,
    default: ''
  }
})

// define emits
const emit = defineEmits(['update:scannerCommand', 'update:qrcode', 'update:isLoading'])

// define video element ref
const scannerElement = ref(null)

// define scanner
const qrScanner = ref(null)

// watch scanner command
watch(
  () => scannerCommand,
  (command) => {
    if (command == 'start') onClickStartScanner()
    if (command == 'stop') onClickStopScanner()
  }
)

// on click start scanner
const onClickStartScanner = async () => {
  // start spinner
  emit('update:isLoading', true)
  // start scanner
  await qrScanner.value.start()
  // stop spinner
  emit('update:isLoading', false)
}

// on click stop scanner
const onClickStopScanner = async () => {
  // start spinner
  emit('update:isLoading', true)
  // stop scanner
  await qrScanner.value.stop()
  // stop spinner
  emit('update:isLoading', false)
}

// init scanner on mount
onMounted(() => {
  // wait a bit
  setTimeout(() => {
    // create scanner instance
    qrScanner.value = new QrScanner(
      scannerElement.value,
      async (result) => {
        emit('update:qrcode', window.atob(result?.data))
      },
      { onDecodeError: () => {}, highlightScanRegion: true }
    )
  }, 500)
})
</script>

<template>
  <AppContainer>
    <template #title>
      <div class="text-center">
        {{ t('views.qrcodeScan.title') }}
      </div>
    </template>
    <template #content>
      <div class="text-center mb-6">
        <p>{{ t('views.qrcodeScan.text') }}</p>
      </div>
      <video id="video" ref="scannerElement" class="rounded-md relative" />
    </template>
    <template #footer>
      <LoadingButton
        :css="'w-full'"
        :is-loading="isLoading"
        @click="$emit('update:scannerCommand', 'stop')"
      >
        {{ t('ui.button.scannerStop') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

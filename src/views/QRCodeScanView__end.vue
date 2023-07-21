<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report.store'
import { getReport } from '@/composables/useReport'
import IconQRCode from '@/components/icons/IconQRCode.vue'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// define isLoading
const isLoading = ref(false)
// get reportStore props
const { renderedReport, typeOfReport } = storeToRefs(useReportStore())

// on request report
const onRequestReport = () => {
  // get report
  getReport(typeOfReport, renderedReport, isLoading)
  // go to scan start after a bit
  setTimeout(() => router.push({ name: 'qrcode-scan-start' }), 0)
}
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
      <div class="flex flex-col items-center justify-start bg-zinc-100 w-full h-full">
        <IconQRCode class="w-36" />
        <span class="text-sm">{{ t('views.qrcodeScan.scanner.done') }}</span>
      </div>
    </template>
    <template #footer>
      <LoadingButton @click.prevent="onRequestReport" :is-loading="isLoading" :css="'w-full'">
        {{ t('ui.button.getReport') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report.store'
import ReportReview from '@/components/report/ReportReview.vue'
import { getReport } from '@/composables/useReport'
import { processAndFlagReport } from '@/composables/useReport'

// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = checklistModule.default

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// define isLoading
const isLoading = ref(false)
// get reportStore prop
const { reportData, renderedReport } = storeToRefs(useReportStore())
const { items, flags } = processAndFlagReport(reportData.value)

// on report
const onRequestReport = () => {
  // get report
  getReport(reportData, renderedReport, isLoading)
  // go to scan start
  router.push({ name: 'qrcode-scan-start' })
}
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.reviewReport.title') }}
    </template>
    <template #content>
      <p class="mb-6">{{ t('views.reviewReport.text') }}</p>
      <ReportReview :checklist="checklist" :items="items" :flags="flags" />
    </template>
    <template #footer>
      <LoadingButton @click.prevent="onRequestReport" :is-loading="isLoading" :css="'w-full'">
        {{ t('ui.button.getReport') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

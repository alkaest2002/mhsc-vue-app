<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { i18n } from '@/i18n'
import { useReportStore } from '@/stores/report.store'
import { storeToRefs } from 'pinia'
import { getReport } from '@/composables/useReport'
import ReportReviewTemplate from '@/components/report/ReportReviewTemplate.vue'

// get i18n t
const { t } = useI18n()
// get router
const router = useRouter()
// import locale-aware checklist
const checklistModule = await import(`@/i18n/locales/checklist.${i18n.global.locale.value}.json`)
const checklist = checklistModule.default
// get reportStore prop
const { reportData, renderedReport } = storeToRefs(useReportStore())
// define isLoading state
const isLoading = ref(false)

// on after report was generated
const onGetReport = () => {
  getReport(reportData, renderedReport, isLoading)
  // go to qrcode scan
  router.push({ name: 'qrcode-scan' })
}
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.reviewReport.title') }}
    </template>
    <template #content>
      <p class="mb-6">{{ t('views.reviewReport.text') }}</p>
      <ReportReviewTemplate :checklist="checklist" :reportData="reportData" />
    </template>
    <template #footer>
      <LoadingButton @click="onGetReport" :is-loading="isLoading" :css="'w-full'">
        {{ t('ui.button.getReport') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>
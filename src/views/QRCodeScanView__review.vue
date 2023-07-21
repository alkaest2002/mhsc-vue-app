<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useReportStore } from '@/stores/report.store'
import { getReport } from '@/composables/useReport'
import ReportReview from '@/components/report/ReportReview.vue'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// define isLoading
const isLoading = ref(false)
// get reportStore props
const { checklist, answers, flags, typeOfReport, renderedReport } = storeToRefs(useReportStore())

// on request report
const onRequestReport = () => {
  // get report
  getReport(typeOfReport, renderedReport, isLoading)
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
      <ReportReview :checklist="checklist" :answers="answers" :flags="flags" />
    </template>
    <template #footer>
      <LoadingButton @click.prevent="onRequestReport" :is-loading="isLoading" :css="'w-full'">
        {{ t('ui.button.getReport') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

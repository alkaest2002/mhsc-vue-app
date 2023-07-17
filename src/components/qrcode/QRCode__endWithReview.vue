<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import ReportReviewTemplate from '@/components/report/ReportReviewTemplate.vue'

// define options
defineOptions({ inheritAttrs: false })

// define props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

// define emits
const emit = defineEmits(['onAfterReport'])

// get i18n t
const { t } = useI18n()
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.reviewReport.title') }}
    </template>
    <template #content>
      <p class="mb-6">{{ t('views.reviewReport.text') }}</p>
      <ReportReviewTemplate v-bind="$attrs" />
    </template>
    <template #footer>
      <LoadingButton
        @click.prevent="$emit('onAfterReport')"
        :is-loading="isLoading"
        :css="'w-full'"
      >
        {{ t('ui.button.getReport') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

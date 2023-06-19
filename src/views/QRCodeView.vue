<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { useI18n } from 'vue-i18n'
import { useChecklistStore } from '@/stores/checklist.store';

// get i18n t
const { t } = useI18n()

const { getChecklistData } = useChecklistStore()


</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcode.title') }}
    </template>
    <template #content>
      {{ getChecklistData }}
    </template>
  </AppContainer>
</template>

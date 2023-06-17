<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <AppPanel>
    <template #title>
      {{ t('app.views.checklist.title') }}
    </template>
  </AppPanel>
</template>

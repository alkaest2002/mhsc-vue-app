<script setup>
import { useI18n } from 'vue-i18n'
const { t } = useI18n()
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcode.title') }}
    </template>
  </AppContainer>
</template>

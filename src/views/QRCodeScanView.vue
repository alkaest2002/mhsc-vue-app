<script setup>
import { useI18n } from 'vue-i18n'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get i18n
const { t } = useI18n()
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcodeScan.title') }}
    </template>
    <template #content>
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'bio' }" :class="'w-full mt-2'">
        {{ t('ui.button.continue') }}
      </RouterLinkButton>
    </template>
  </AppContainer>
</template>

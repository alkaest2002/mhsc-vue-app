<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import IconQRCode from '@/components/icons/IconQRCode.vue'

// get i18n t
const { t } = useI18n()

// define props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  }
})

// define emits
const emit = defineEmits(['onRequestReport'])
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
      <LoadingButton
        :class="'w-full'"
        :is-loading="isLoading"
        @click.prevent="$emit('onRequestReport')"
      >
        {{ t('ui.button.continue') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

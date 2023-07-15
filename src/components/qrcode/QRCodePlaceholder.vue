<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import IconCamera from '@/components/icons/IconCamera.vue'
import IconQRCode from '@/components/icons/IconQRCode.vue'

// get i18n t
const { t } = useI18n()

// define props
const props = defineProps({
  isLoading: {
    type: Boolean,
    required: true
  },
  deviceHasCamera: {
    type: Boolean,
    required: true
  },
  scannerCommand: {
    type: String,
    default: ''
  },
  scannerStatus: {
    type: String,
    default: 'idle'
  },
  renderedReport: {
    type: [null, String],
    default: null
  }
})

// define emits
const emit = defineEmits(['update:scannerCommand', 'onAfterReport'])
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
        <p v-if="!deviceHasCamera">{{ t('views.qrcodeScan.scanner.noCamera') }}</p>
        <p v-else>{{ t('views.qrcodeScan.text') }}</p>
      </div>
      <div class="flex flex-col items-center justify-start bg-zinc-100 w-full h-full">
        <IconCamera v-if="!renderedReport" class="w-36" />
        <IconQRCode v-else class="w-36" />
        <span v-if="!renderedReport" class="text-sm">{{
          t('views.qrcodeScan.scanner.start')
        }}</span>
        <span v-else class="text-sm">{{ t('views.qrcodeScan.scanner.done') }}</span>
      </div>
    </template>
    <template #footer>
      <div v-if="deviceHasCamera">
        <LoadingButton
          v-show="scannerStatus == 'idle' && renderedReport === ''"
          :css="'w-full'"
          :is-loading="isLoading"
          @click="$emit('update:scannerCommand', 'start')"
        >
          {{ t('ui.button.scannerStart') }}
        </LoadingButton>
        <LoadingButton
          v-show="renderedReport !== ''"
          :class="'w-full'"
          :is-loading="isLoading"
          @click.prevent="$emit('onAfterReport')"
        >
          {{ t('ui.button.continue') }}
        </LoadingButton>
      </div>
      <div v-else>
        <RouterLinkButton :to="{ name: 'start' }" :class="'w-full mt-2'">
          {{ t('ui.button.back') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

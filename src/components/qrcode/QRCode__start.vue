<script setup>
/* eslint-disable no-unused-vars */
import { useI18n } from 'vue-i18n'
import IconCamera from '@/components/icons/IconCamera.vue'

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
    type: [null, String],
    required: true
  }
})

// define emitted events
const emit = defineEmits(['update:scannerCommand'])
</script>

<template>
  <AppContainer>
    <template #title>
      <div class="text-center">
        {{ t('views.qrcodeScan.title') }}
      </div>
    </template>
    <template #content>
      <template v-if="!deviceHasCamera">
        <div class="text-center mb-6">
          <p>{{ t('views.qrcodeScan.scanner.noCamera') }}</p>
        </div>
      </template>
      <template v-else>
        <div class="text-center mb-6">
          <p>{{ t('views.qrcodeScan.text') }}</p>
        </div>
        <div class="flex flex-col items-center justify-start bg-zinc-100 w-full h-full">
          <IconCamera class="w-36" />
          <span class="text-sm">{{ t('views.qrcodeScan.scanner.start') }}</span>
        </div>
      </template>
    </template>
    <template #footer>
      <div v-if="deviceHasCamera">
        <LoadingButton
          :css="'w-full'"
          :is-loading="isLoading"
          @click="$emit('update:scannerCommand', 'start')"
        >
          {{ t('ui.button.scannerStart') }}
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

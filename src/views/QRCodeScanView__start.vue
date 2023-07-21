<script setup>
/* eslint-disable no-unused-vars */
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import QrScanner from 'qr-scanner'
import IconCamera from '@/components/icons/IconCamera.vue'

// get i18n t
const { t } = useI18n()

// define device has camera
const deviceHasCamera = ref(false)

// on mounted
onMounted(async () => {
  // flag whether device has camera or not
  deviceHasCamera.value = await QrScanner.hasCamera()
})
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
        <RouterLinkButton :to="{ name: 'qrcode-scan-scan' }" :class="'w-full'">
          {{ t('ui.button.scannerStart') }}
        </RouterLinkButton>
      </div>
      <div v-else>
        <RouterLinkButton :to="{ name: 'start' }" :class="'w-full'">
          {{ t('ui.button.back') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

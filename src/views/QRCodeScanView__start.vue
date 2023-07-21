<script setup>
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import { useAppStore } from '@/stores/app.store'
import { useReportStore } from '@/stores/report.store'
import IconCamera from '@/components/icons/IconCamera.vue'

// get i18n t
const { t } = useI18n()
// get appStore prop
const { deviceHasCamera } = storeToRefs(useAppStore())
// get reportStore
const reportStore = useReportStore()

// on mounted
onMounted(async () => {
  // reset reportStpre
  reportStore.$reset()
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

<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, onMounted, onBeforeUnmount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { storeToRefs } from 'pinia'
import QrcodeVue from 'qrcode.vue'
import { throttle } from '@/utils/generic.functions'
import { useChecklistStore } from '@/stores/checklist.store'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// get pinia checklist store
const checklistStore = useChecklistStore()
// pick checklist store prop
const { getChecklistData, qrcodeIsPresent } = storeToRefs(checklistStore)
// set pinia checklist store prop
qrcodeIsPresent.value = true
// init isLoading state
const isLoading = ref(false)
// init windowsize prop
const qrcodeSize = ref(Math.min(window.innerWidth * 0.6, 250))
// on click button function
const onClickResetQRCode = () => {
  // reset pinia checklistStore prop
  qrcodeIsPresent.value = false
  // go to home
  router.push({ name: 'start' })
}

// re-compute window size
const onResizeWindow = throttle(
  () => (qrcodeSize.value = Math.max(150, Math.min(window.innerWidth * 0.6, 250)))
)

// add resize event listener
onMounted(() => window.addEventListener('resize', onResizeWindow))

// stop spinner before unmount
onBeforeUnmount(() => (isLoading.value = false))

// on unmounted
onUnmounted(() => {
  // reset pinia checklist store
  if (!qrcodeIsPresent.value) checklistStore.$reset()
  // remove resize event listener
  window.removeEventListener('resize', onResizeWindow)
})
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcodeGenerate.title') }}
    </template>
    <template #content>
      <p class="block mb-6">
        {{ t('views.qrcodeGenerate.text') }}
      </p>
      <div class="border-4 border-sky-800 mt-4 p-2 rounded-lg w-fit mx-auto">
        <Suspense>
          <qrcode-vue
            :value="window.btoa(getChecklistData)"
            :size="qrcodeSize"
            level="H"
            :render-as="'svg'"
            :foreground="'#075985'"
          />
          <template #fallback>
            <div
              class="w-[250px] h-[250px] flex justify-center items-center text-center font-semibold"
            >
              <p v-html="t('views.qrcodeGenerate.generatingCode')" />
            </div>
          </template>
        </Suspense>
      </div>
    </template>
    <template #footer>
      <LoadingButton
        @click="onClickResetQRCode"
        :is-loading="isLoading"
        :color="'red'"
        :css="'w-full'"
      >
        {{ t('ui.button.reset') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

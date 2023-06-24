<script setup>
/* eslint-disable no-unused-vars, vue/no-setup-props-destructure */
import { ref, onBeforeUnmount, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useChecklistStore } from '@/stores/checklist.store'
import { storeToRefs } from 'pinia'
import QrcodeVue from 'qrcode.vue'

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

// on click button function
const onClickResetQRCode = () => {
  // reset pinia checklistStore prop
  qrcodeIsPresent.value = false
  // go to home
  router.push({ name: 'start' })
}

// stop spinner before unmount
onBeforeUnmount(() => (isLoading.value = false))

// on unmounted reset pinia checklist store
onUnmounted(() => {
  if (!qrcodeIsPresent.value) checklistStore.$reset()
})
</script>

<template>
  <AppContainer>
    <template #title>
      {{ t('views.qrcodeGenerate.title') }}
    </template>
    <template #content>
      <p class="mb-8">
        {{ t('views.qrcodeGenerate.text') }}
      </p>
      <div class="border-4 border-sky-800 mt-4 p-2 rounded-lg w-fit mx-auto">
        <Suspense>
          <qrcode-vue
            :value="window.btoa(getChecklistData)"
            :size="250"
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
      <LoadingButton @click="onClickResetQRCode" :is-loading="isLoading" :color="'red'" :css="'w-full'">
        {{ t('ui.button.reset') }}
      </LoadingButton>
    </template>
  </AppContainer>
</template>

<script setup>
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.store'
import { getSupportedLocales } from '@/i18n'
import FormSelect from '@/components/form/FormSelect.vue'
import IconChecklistWorker from '@/components/icons/IconChecklistWorker.vue'
import IconChecklistAme from '@/components/icons/IconChecklistAme.vue'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// get supported locales
let supportedLocales = getSupportedLocales(false)
// get pinia appStore prop
const { locale, userIsAME } = storeToRefs(useAppStore())
// watch locale
watch(locale, (newLocale) => {
  router.replace({ name: 'start', query: { locale: newLocale } })
})
// computed prop
const to = computed(() => {
  if (userIsAME.value) return { name: 'qrcode-scan' }
  return { name: 'info' }
})
</script>

<template>
  <AppContainer>
    <template #content>
      <div class="flex flex-col justify-center items-center h-full">
        <IconChecklistAme v-if="userIsAME" class="w-36" />
        <IconChecklistWorker v-else class="w-36" />
        <h1 class="text-2xl font-bold text-center mt-2" v-html="t('views.start.title')" />
        <h2 v-if="userIsAME" class="text-bold">{{ t('views.start.userIsAME') }}</h2>
      </div>
    </template>
    <template #footer>
      <div class="mb-2">
        {{ t('views.start.selectLanguage') }}
      </div>
      <div class="mb-2">
        <FormSelect :css="'w-full'" :options="supportedLocales" v-model="locale" />
      </div>
      <div>
        <RouterLinkButton :to="to" class="w-full">
          {{ t('ui.button.enter') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

<script setup>
import { watch, computed } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.store'
import { getSupportedLocales } from '@/i18n'
import FormSelect from '@/components/form/FormSelect.vue'
import IconAirport from '@/components/icons/IconAirport.vue'
import IconDoctor from '@/components/icons/IconDoctor.vue'

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
        <IconDoctor v-if="userIsAME" class="max-w-[250px]" />
        <IconAirport v-else class="max-w-[30vw] sm:max-w-[150px]" />
        <h1 class="text-2xl font-bold text-center mt-2" v-html="t('views.start.title')" />
        <h2 v-if="userIsAME" class="text-bold">{{ t('views.start.userIsAME') }}</h2>
      </div>
    </template>
    <template #footer>
      <div class="mb-2">
        {{ t('views.start.selectLanguage') }}
      </div>
      <div>
        <FormSelect :css="'w-full mb-3'" :options="supportedLocales" v-model="locale" />
      </div>
      <div>
        <RouterLinkButton :to="to" class="w-full">
          {{ t('ui.button.enter') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/stores/app.store'
import { getSupportedLocales } from '@/i18n'
import FormSelect from '@/components/form/FormSelect.vue'
import RouterLinkButton from '@/components/ui/RouterLinkButton.vue'

// get router
const router = useRouter()
// get i18n t
const { t } = useI18n()
// get supported locales
let supportedLocales = getSupportedLocales(false)
// get pinia appStore prop
const { locale } = storeToRefs(useAppStore())
// watch locale
watch(locale, (newLocale) => {
  router.replace({ name: 'start', query: { locale: newLocale } })
})
</script>

<template>
  <AppContainer>
    <template #content>
      <div class="flex flex-col justify-center items-center h-full">
        <img src="@/assets/airport.svg" class="max-w-[30vw] md:max-w-[150px]" />
        <h1 class="text-2xl font-bold text-center mt-2" v-html="t('views.start.title')" />
      </div>
    </template>
    <template #footer>
      <div class="mb-2">
        {{ t('views.start.selectLanguage') }}
      </div>
      <div>
        <FormSelect class="w-full mb-3" :options="supportedLocales" v-model="locale" />
      </div>
      <div>
        <RouterLinkButton :to="{ name: 'info' }" class="w-full">
          {{ t('ui.button.enter') }}
        </RouterLinkButton>
      </div>
    </template>
  </AppContainer>
</template>

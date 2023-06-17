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
// get i18n
const { t } = useI18n()
// get supported locales
let supportedLocales = getSupportedLocales(false)
// get piniaappStore local props
const { locale } = storeToRefs(useAppStore())
// watch locale
watch(locale, (newLocale) => {
  router.replace({ name: 'home', query: { locale: newLocale } })
})
</script>

<template>
  <AppPanel>
    <template #title>
      {{ t('app.views.home.title') }}
    </template>
    <template #content>
      <p class="mb-3">
        {{ t('app.views.home.selectLanguage') }}
      </p>
      <FormSelect :class="'mb-3 w-full'" :options="supportedLocales" v-model="locale" />
    </template>
    <template #footer>
      <RouterLinkButton :to="{ name: 'start' }" class="w-full">
        {{ t('app.ui.button.enter') }}
      </RouterLinkButton>
    </template>
  </AppPanel>
</template>

import { createRouter, createWebHistory } from 'vue-router'
import { i18n, setI18nLocale } from '@/i18n'
import { useAppStore } from '@/stores/app.store'
import { storeToRefs } from 'pinia'
import { routes } from './routes'

// init router
const router = createRouter({ history: createWebHistory(import.meta.env.BASE_URL), routes })

// router 'before each' middleware
router.beforeEach(async (to, from, next) => {
  // get pinia store prop
  const { locale } = storeToRefs(useAppStore())
  // get current i18n locale
  const currentLocale = i18n.global.locale.value
  // set requested locale to be either query locale or appStore locale or i18n fallback locale
  const requestedLocale = to.query.locale || locale.value || i18n.global.fallbackLocale.value
  // if requested locale is diffent from current i18n locale
  if (requestedLocale != currentLocale) {
    try {
      // try to set requested locale
      await setI18nLocale(requestedLocale)
      // persist requested locale to pinia
      locale.value = requestedLocale
      // in case locale was not found
    } catch (err) {
      // notify user
      console.log(err)
    }
  }
  // go next
  return next()
})

export default router

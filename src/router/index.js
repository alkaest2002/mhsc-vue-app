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
  const currentLocale = locale.value || i18n.global.locale.value
  // if requested locale is diffent from current i18n locale
  if (to.query.locale && to.query.locale != i18n.global.locale.value) {
    try {
      // try to set requested locale
      await setI18nLocale(to.query.locale, currentLocale)
      // persist requested locale to pinia
      locale.value = to.query.locale
      // in case locale was not found
    } catch (err) {
      console.log(currentLocale, i18n.global.t(err))
      // notify user
      console.log(i18n.global.t(err))
    }
  }
  // go next
  return next()
})

export default router

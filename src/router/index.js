import { createRouter, createWebHistory } from 'vue-router'
import { storeToRefs } from 'pinia'
import { i18n, setI18nLocale } from '@/i18n'
import { useAppStore } from '@/stores/app.store'
import { useChecklistStore } from '@/stores/checklist.store'
import { routes } from './routes'
import pageNotFoundView from '@/views/PageNotFoundView.vue'

// init router
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    ...routes,
    {
      path: '/:catchAll(.*)',
      name: 'route-not-found',
      component: pageNotFoundView
    }
  ]
})

// router 'before each' middleware
router.beforeEach(async (to, from, next) => {
  // get pinia appStore prop
  const { locale } = storeToRefs(useAppStore())
  // get pinia checkList store prop
  const { qrcodeIsPresent } = storeToRefs(useChecklistStore())
  // go directly to qrcode if it's the case
  if (qrcodeIsPresent.value && [from.name != 'qrcode', to.name != 'qrcode'].every(Boolean))
    return next({ name: 'qrcode' })
  // get current i18n locale
  const requestedLocale = to.query.locale || locale.value || i18n.global.locale.value
  // if requested locale is diffent from current i18n locale
  if (requestedLocale != i18n.global.locale.value) {
    try {
      // try to set requested locale
      await setI18nLocale(requestedLocale)
      // persist requested locale to pinia
      locale.value = requestedLocale
      // in case locale was not found
    } catch (err) {
      // notify user
      console.log(i18n.global.t(err))
    }
  }
  // go next
  return next()
})

export default router

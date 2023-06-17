import { nextTick } from 'vue'
import { createI18n } from 'vue-i18n'
import en from '@/i18n/locales/app.en.json'
import supportedLocales from './supported.locales.json'

export const i18n = createI18n({
  locale: 'en',
  fallbackLocale: 'en',
  messages: { en },
  legacy: false
})

export function getSupportedLocales(asList = true) {
  if (asList) return supportedLocales.map(({ value }) => value)
  return supportedLocales
}

const loadLocaleMessages = async (locale) => {
  try {
    // try to load locale messages file
    const response = await import(/* @vite-ignore */ `./locales/app.${locale}.json`)
    // get locale messages from response
    const messages = response.default || response
    // set new locale and messages
    i18n.global.setLocaleMessage(locale, messages)
    // return next tick
    return nextTick()
    // on error while loading locale messages file
  } catch (err) {
    // reject request
    return Promise.reject('errors.i18n.unableToLoadLocaleFile')
  }
}

export async function setI18nLocale(newLocale, currentLocale) {
  // get supported locales
  const supportedLocales = getSupportedLocales(true)
  // set requested locale
  const requestedLocale = supportedLocales.includes(newLocale) 
    ? newLocale 
    : currentLocale
  // if requested locale is not yet loaded
  if (!i18n.global.availableLocales.includes(requestedLocale)) {
    try {
      // try to load requested locale messages
      await loadLocaleMessages(requestedLocale)
      // error while loading requested locale messages
    } catch (err) {
      // notify user
      return Promise.reject(err)
    }
  }
  // set requested locale
  i18n.global.locale.value = requestedLocale
  // resolve request
  return Promise.resolve()
}

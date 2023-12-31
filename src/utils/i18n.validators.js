import * as validators from '@vuelidate/validators'
import { i18n } from '@/i18n'

const { createI18nMessage } = validators
const { regex } = validators.helpers
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

export const required = withI18nMessage(validators.required)
export const alpha = withI18nMessage(validators.alpha)
export const maxLength = withI18nMessage(validators.maxLength, { withArguments: true })
export const extendedAlpha = withI18nMessage(regex(/^[a-zA-Z'()\- ]*$/))
export const isDate = withI18nMessage(regex(/^(\d{2}){2}-\d{2}-(\d{2})$/gm))
export const isBoolean = withI18nMessage((value) => value === true || value === false)
export const enumeration = withI18nMessage((list) => (value) => list.includes(value), {
  withArguments: true
})

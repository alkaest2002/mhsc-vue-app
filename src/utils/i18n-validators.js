import * as validators from '@vuelidate/validators'
import { i18n } from '@/i18n'

const { createI18nMessage } = validators
const { withMessage, regex } = validators.helpers
const withI18nMessage = createI18nMessage({ t: i18n.global.t.bind(i18n) })

export const required = withI18nMessage(validators.required)
export const alpha = withI18nMessage(validators.alpha)
export const extendedAlpha = withI18nMessage(
  withMessage('validations.extendedAlpha', regex(/^[a-zA-Z'()\- ]*$/))
)

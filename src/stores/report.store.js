import { getCurrentInstance } from 'vue'
import { defineStore } from 'pinia'
import { useVuelidate } from '@vuelidate/core'
import { isBoolean, enumeration, required } from '@/utils/i18n.validators'

// base degault settings
const defaultSettings = () => ({
  typeOfReport: 'download',
  reviewReport: true,
  highlightPositiveItems: false
})

const getReportSettings = (settings) => {
  // define validation rules
  const rules = {
    typeOfReport: { required, enumeration: enumeration(['download', 'print']) },
    reviewReport: { isBoolean },
    highlightPositiveItems: { isBoolean }
  }
  // init vuelidate instance
  const v = useVuelidate(rules, settings, { getCurrentInstance: getCurrentInstance() })
  // validate settings
  v.value.$touch()
  // if validation is ok
  if (v.value.$errors.length == 0) return { ...settings }
  console.log(v.value.reviewReport.$errors)
  // otherwise return base settings
  return defaultSettings()
}

export const useReportStore = defineStore('reportStore', {
  state: () => {
    return {
      ...getReportSettings(window.reportSettings),
      name: '',
      surname: '',
      birthWhen: '',
      answers: [],
      flags: [],
      checklist: [],
      report: {},
      reportData: '',
      renderedReport: ''
    }
  }
})

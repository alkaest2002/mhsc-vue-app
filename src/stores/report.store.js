import { defineStore } from 'pinia'

const baseSettings = () => ({
  typeOfReport: 'screen',
  highlightPositiveItems: true
})

const getReportSettings = (settings) => {
  // try to validate settings
  try {
    // apply rules
    const settingsAreOk = [
      Object.keys(settings).sort().join() ==
        ['typeOfReport', 'highlightPositiveItems'].sort().join(),
      ['screen', 'download', 'print'].includes(settings.typeOfReport),
      settings.highlightPositiveItems === true || settings.highlightPositiveItems == false
    ].every(Boolean)
    // if validations are passed
    if (settingsAreOk) return { ...settings }
    // return base settings
    return baseSettings()
    // on error
  } catch (err) {
    // return base settings
    return baseSettings()
  }
}

export const useReportStore = defineStore('reportStore', {
  state: () => {
    return getReportSettings(window.reportSettings)
  }
})

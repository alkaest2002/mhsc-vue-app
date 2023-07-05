import { defineStore } from 'pinia'

export const useReportStore = defineStore('reportStore', {
  state: () => {
    return { ...window.reportSettings }
  }
})

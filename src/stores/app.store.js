import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  persist: {
    storage: sessionStorage
  },
  state: () => {
    return {
      locale: 'en'
    }
  }
})

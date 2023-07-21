import { defineStore } from 'pinia'

export const useAppStore = defineStore('appStore', {
  persist: {
    storage: localStorage
  },
  state: () => {
    return {
      locale: 'en',
      userIsAME: false,
      deviceHasCamera: false
    }
  }
})

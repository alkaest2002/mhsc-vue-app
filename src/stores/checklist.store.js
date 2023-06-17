import { defineStore } from 'pinia'

export const useChecklistStore = defineStore('checklistStore', {
  persist: {
    storage: sessionStorage
  },
  state: () => {
    return {
      disclaimer: false,
      bio: {
        name: '',
        surname: '',
        birthWhere: '',
        birthWhen: ''
      },
      answers: Array.from({ length: 21 }, () => null)
    }
  },

  getters: {
    getChecklistData: (state) => Object.values(state.answers).join('')
  },
  actions: {}
})

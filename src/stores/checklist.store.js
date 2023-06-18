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
    getFirstItemIndex: () => 0,
    getLastItemIndex: (state) => state.answers.length -1,
    getFirstItemIndexToAnswer: (state) => state.answers.findLastIndex(e => e !== null) + 1 || 0,
    getChecklistData: (state) => [ ...Object.values(state.bio), Object.values(state.answers) ].join(';')
  },
  actions: {}
})

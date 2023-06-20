import { defineStore } from 'pinia'

export const useChecklistStore = defineStore('checklistStore', {
  persist: {
    storage: localStorage
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
      answers: Array.from({ length: 21 }, () => null),
      currentItemIndex: 0,
      qrcodeWasGenerated: false
    }
  },
  getters: {
    getCurrentAnswer: (state) => state.answers[state.currentItemIndex],
    getIsFirstItemIndex: (state) => state.currentItemIndex == 0,
    getIsLastItemIndex: (state) => state.currentItemIndex == state.answers.length - 1,
    getChecklistData: (state) =>
      [...Object.values(state.bio), ...Object.values(state.answers)].join(';')
  }
})

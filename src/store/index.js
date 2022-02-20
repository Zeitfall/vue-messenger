import { defineStore } from 'pinia';

export const useStore = defineStore('store', {
  state: () => {
    return {
      showModals: {
        createChat: false
      },
      currentUser: {},
      currentChat: {},
      currentChatMessages: [],
      burgerIsActive: false
    }
  }
});

<template>
  <form class="chat-create" @submit.prevent="onSubmit">
    <div class="chat-create__container">
      <div class="chat-create__body">
        <header class="chat-create__header">
          <div class="chat-create__title">Create Chat</div>
          <button class="chat-create__close">
            <span class="material-icons"
             @click="store.showModals.createChat = false"
            >close</span>
          </button>
        </header>

        <div class="chat-create__block auth__block">
          <label for="input">Chat Name</label>
          <input type="text" class="chat-create__input inpt"
            v-model="newChat.name"
          >
        </div>

        <div class="chat-create__block auth__block">
          <label for="input">Max Users</label>
          <input type="text" class="chat-create__input inpt"
            v-model="newChat.maxUsers"
          >
        </div>

        <button type="submit" class="chat-create__button btn">
          <span>Create</span>
        </button>
      </div>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from '@/store';
import chatCreate from '@/assets/js/modules/module.chatCreate';

const newChat = ref({
  name: '',
  maxUsers: null
});
const store = useStore();

const onSubmit = () => {
  const status = chatCreate(newChat.value);
  if(!status) return;

  store.showModals.createChat = false;
  newChat.value = {
    name: '',
    maxUsers: null
  };
};
</script>

<style lang="scss" scoped>
@import '@/assets/scss/_global.scss';

.chat-create {
  position: absolute;
  inset: 0;
  display: flex;
  background-color: rgba(0, 0, 0, .125);
  backdrop-filter: blur(1.5px);
  z-index: 5;

  &__container {
    display: flex;
    align-items: center;
    width: 100%;
    padding: 0 20px;
  }
  
  &__body {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    background-color: $white;
    border-radius: 10px;
    box-shadow: 0px 0px 15px -3px rgba(0, 0, 0, .25);
  }

  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__title {
    font-size: 24px;
  }

  &__block {
  }

  &__input {
  }

  &__close {
    background-color: transparent;
    display: flex;
    align-items: center;

    span[class="material-icons"] {
      height: 100%;
    }
  }
}

</style>

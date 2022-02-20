<template>
  <div class="main__chat chat">
    <div class="chat__container">
      <div class="chat__body">
        <header class="chat__header">
          <div
            class="chat__burger"
            @click="store.burgerIsActive = !store.burgerIsActive"
          ><span></span></div>
          <div class="chat__title">{{ store.currentChat.name }}</div>
        </header>


        <ul class="chat__list"
          :class="{'chat__list_active': Object.entries(store.currentChat).length !== 0}"
        >
          
          <li class="chat__message message"
            v-for="m of store.currentChat.messages"
            :key="m.key"
            :class="{message_current: m.user.name === store.currentUser.name}"
          >
            <div class="message__body"
              :class="{message__body_current: m.user.name === store.currentUser.name}"
            >
              <div class="message__header">
                <div class="message__user">{{ m.user.name }}</div>
                <div class="message__time">{{ m.time }}</div>
              </div>
              <div class="message__content"
                :class="{message__content_current: m.user.name === store.currentUser.name}"
              >
                <!-- <span class="material-icons">subdirectory_arrow_right</span> -->
                <span>{{ m.message.content }}</span>
              </div>
            </div>
          </li>
        
        </ul>


        <div class="chat__empty"
          v-if="Object.entries(store.currentChat).length === 0"
        >
          <p>Join or create your own chat to get closer with others!</p>
          <p>Feel free!</p>
          <span class="material-icons">sentiment_satisfied_alt</span>
        </div>


        <form
          class="chat__footer footer" 
          @submit.prevent="onSend(store.currentChat)"
        >
          <div class="footer__body">
            <input
              type="text"
              class="chat__input"
              placeholder="Start a new message"
              v-model="newMessage"
            >
            <button class="chat__button"
              type="submit"
            >
              <span class="material-icons">send</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useStore } from '@/store';

import app from '@/db/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

import chatPushMessage from '@/assets/js/modules/module.chatPushMessage';
import chatGetCurrent from '@/assets/js/modules/module.chatGetCurrent';
import loadCurrentUser from '@/assets/js/modules/module.loadCurrentUser';

const newMessage = ref('');
const store = useStore();
// const burgerIsActive = ref(false);


onBeforeMount(async() => {
  await chatGetCurrent(); /** it sends current chat to the store */
});


/** loading current user */
loadCurrentUser();


const scrollDown = query => {
  const block = document.querySelector(query);
  block.scrollTop = block.scrollHeight;
};

addEventListener('resize', () => scrollDown('.chat__list'));

/** sends message */
const onSend = async(chat) => {
  await chatPushMessage(store.currentUser, store.currentChat, newMessage.value);
  
  scrollDown('.chat__list');

  newMessage.value = '';
};
</script>


<style lang="scss" scoped>
@import '@/assets/scss/_global.scss';

.chat {
  display: flex;

  &__empty {
    flex: 0 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    min-width: 240px;
    max-height: calc(100vh - 60px - 60px - 20px); /** 100vh - header - footer - inner padding 2*10px */
    height: 100%;

    overflow-y: scroll;
    scroll-behavior: smooth;
    gap: 10px;

    span, p {
      color: $light-mid-grey;
      font-size: 24px;
    }

    p {
      // min-width: 75%;
      text-align: center;
      line-height: 40px;
    }

    span {
      font-size: 64px;
    }
  }

  &__container {
    display: flex;
    min-width: 100%;
    max-width: 0 !important;
    padding: 0 !important;
    margin: 0 !important;
  }

  &__body {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;

    &_active { display: flex; }
  }

  &__header {
    min-height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $light-grey;
  }

  &__burger {
    height: 100%;
    display: none;
    align-items: center;

    span {
      display: block;
      position: relative;
      width: 30px;
      height: 2px;
      background-color: #000;

      &:before, &:after {
        content: '';
        position: absolute;
        width: 100%;
        height: 2px;
        background-color: #000;
      }

      &:before {
        transform: translateY(-10px);
      }

      &:after {
        transform: translateY(10px);
      }
    }
  }

  &__title {
    font-size: 24px;
    margin: 0 0 0 auto;
  }

  &__list {
    flex: 0 0 auto;
    display: none;
    max-height: calc(100vh - 60px - 60px - 20px); /** 100vh - header - footer - inner padding 2*10px */
    height: 100%;
    padding: 10px;
    overflow-x: hidden;
    overflow-y: scroll;
    scroll-behavior: smooth;

    &_active {
      display: block;
    }

    li:not(:last-child) {
      margin: 0 0 20px 0;
    }
  }

  &__message {
  }

  &__footer {
  }

  &__input {
    width: 100%;
    height: 100%;
    padding: 0 60px 0 20px;
  }

  &__button {
    position: absolute;
    inset: 0 0 0 auto;
    width: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: transparent;

    span[class="material-icons"] {
      flex: 1 0 100%;
      color: $dark-grey;
    }
  }
}
.footer {
  flex: 1 1 100%;
  position: relative;
  border-top: 1px solid $light-grey;
  
  &__body {
    position: absolute;
    inset: 0;
  }
}
.message {
  display: flex;
  
  &_current {
    justify-content: flex-end;
  }

  &__body {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    max-width: 50%;

    padding: 10px;
    background-color: rgb(245, 245, 245);
    border-radius: 10px;

    &_current {
      align-items: flex-end;
    }
  }

  &__header {
    display: flex;
    align-items: flex-end;
    margin: 0 0 10px 0;
    // justify-content: space-between;
  }

  &__user {
    margin: 0 10px 0 0;
    font-weight: 700;
  }

  &__time {
    flex: 0 0 auto;
    font-size: 12px;
    color: $mid-grey;
  }

  &__content {      
    span:last-child { 
      flex: 1 1 auto;
      line-height: 18px;
    }
    span[class="material-icons"] {
      align-self: flex-start;
      color: $light-grey;
      margin: 0 5px 0 0;
      transform: translateY(-3px);
    }
  }
}

/** tablet */
@media(max-width: 767.98px) {
  .chat {
    &__burger {
      display: flex;
    }
  }
}

/** mobile l */
@media(max-width: 639.98px) {
  .message {
    &__body {
      max-width: none;
    }
  }
}
</style>

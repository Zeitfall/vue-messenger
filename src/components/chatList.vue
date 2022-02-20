<template>
  <div class="main__chat-list chat-list"
    :class="{'chat-list_active': store.burgerIsActive}"
  >
    <div class="chat-list__body">
      <header class="chat-list__header">
        <div class="chat-list__burger"><span></span></div>
        <input type="text" class="chat-list__search inpt" placeholder="Search">
        <button class="chat-list__create">
          <span class="material-icons"
            @click="store.showModals.createChat = true"
          >post_add</span>
        </button>
      </header>

      <ul class="chat-list__list list">
        <div class="list__body">

          <li class="chat"
            v-for="c of chatList"
            :key="c.key"
            @click="onClick(c)"
          >
            <div class="chat__body inpt">
              <div class="chat__status"></div>
              <div class="chat__name">{{ c.name }}</div>
              <div class="chat__users">{{ c.users.length }}/{{ c.maxUsers }}</div>
            </div>
          </li>
        </div>
      </ul>

      <footer class="chat-list__footer footer">
        <div class="footer__body">
          <div class="footer__greetings">Hello, {{ store.currentUser.name }}!</div>
          <button class="footer__button" @click="onSignOut">
            <span class="material-icons">logout</span>
          </button>
        </div>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';

// import getUser from '@/assets/js/modules/module.getUser';
import { signOut } from '@/assets/js/modules/module.auth';

import chatList from '@/assets/js/modules/module.chatFetch';
import chatUpdateUsers from '@/assets/js/modules/module.chatUpdateUsers';
import chatSetCurrent from '@/assets/js/modules/module.chatSetCurrent';
import chatGetCurrent from '@/assets/js/modules/module.chatGetCurrent';
import loadCurrentUser from '@/assets/js/modules/module.loadCurrentUser';

import app from '@/db/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const router = useRouter();
const store = useStore();

/** loading current user */
loadCurrentUser();


/** selecting chat */
const onClick = async(chat) => {
  await chatUpdateUsers(chat, store.currentUser);
  await chatSetCurrent(chat);
  await chatGetCurrent(); /** it sends current chat to the store */

  store.burgerIsActive = false;
};


/** signing out */
const onSignOut = async() => {
  const status = await signOut();

  if(!status) return;

  store.currentChat= {};

  localStorage.getItem('CURRENT_CHAT') ? localStorage.removeItem('CURRENT_CHAT') : '';
  router.push({ name: 'login' });
};


</script>

<style lang="scss" scoped>
@import '@/assets/scss/_global.scss';

.chat-list {
  display: flex;

  &__body {
    flex: 1 1 100%;
    display: flex;
    flex-direction: column;
    padding: 0 20px 0 0;
  }

  &__list {
  }

  &__header {
    min-height: 60px;
    display: flex;
    align-items: center;
    border-bottom: 1px solid $light-grey;
  }

  &__search {
    border-color: $light-grey;
  }

  &__create {
    height: 100%;
    padding: 0 10px;
    background-color: transparent;
  }

  &__footer {
  }
}
.list {
  flex: 0 0 auto;
  display: flex;
  max-height: calc(100vh - 60px - 60px - 20px); /** 100vh - header - footer - inner padding 2*10px */
  height: 100%;
  overflow-y: scroll;
  scroll-behavior: smooth;

  &__body {
    flex: 1 1 100%;
    padding: 10px;
    li:not(:last-child) { margin: 0 0 20px 0; }
  }
}
.chat {
  &__body {
    min-height: 40px;
    display: flex;
    align-items: center;
    border-color: $light-grey;
  }

  &__status {
    width: 10px;
    height: 10px;
    margin: 0 10px 0 0;
    background-color: lime;
    border-radius: 50%;
  }

  &__name {
  }

  &__users {
    margin: 0 0 0 auto;
    font-size: 12px;
    color: $mid-grey;
  }
}
.footer {
  border-top: 1px solid $light-grey;

  &__body {
    min-height: 60px;
    display: flex;
    align-items: center;
  }

  &__button {
    margin: 0 0 0 auto;
    padding: 0 10px;
    background-color: transparent;
  }
}


/** tablet */
@media(max-width: 767.98px) {
  .chat-list {
    display: none;

    &_active {
      display: flex;
    }
  }
}

</style>

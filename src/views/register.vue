<template>
  <form class="auth__body" @submit.prevent="onSubmit">
    <header class="auth__header">
      <div class="auth__title">Messenger</div>
      <div class="auth__subtitle">register</div>
    </header>

    <div class="auth__block">
      <label for="input">name</label>
      <input
        type="text"
        class="auth__input inpt"
        placeholder=""
        v-model="newUser.name"
      >
    </div>

    <div class="auth__block">
      <label for="input">email</label>
      <input
        type="text"
        class="auth__input inpt"
        placeholder=""
        v-model="newUser.email"
      >
    </div>

    <div class="auth__block">
      <label for="input">password</label>
      <input
        type="password"
        class="auth__input inpt"
        placeholder=""
        v-model="newUser.password"
      >
    </div>
    
    <button
      type="submit"
      class="auth__button btn"
    >Join</button>

    <router-link :to="{ name: 'login' }" class="auth__redirect">already a member?</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { signUp } from '@/assets/js/modules/module.auth';

const newUser = ref({
  name: '',
  email: '',
  password: ''
});
const router = useRouter();
const store = useStore();

const onSubmit = async() => {
  const status = await signUp(newUser.value);

  if(!status) return;  

  store.currentUser = {
    name: newUser.value.name,
    email: newUser.value.email
  }

  newUser.value = {
    name: '',
    email: '',
    password: ''
  };

  router.push({ name: 'main' });
};
</script>

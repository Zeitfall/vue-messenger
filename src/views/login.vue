<template>
  <form class="auth__body" @submit.prevent="onSubmit">
    <header class="auth__header">
      <div class="auth__title">Messenger</div>
      <div class="auth__subtitle">login</div>
    </header>

    <div class="auth__block">
      <label for="input">email</label>
      <input
        type="text"
        class="auth__input inpt"
        placeholder=""
        v-model="currentUser.email"
      >
    </div>

    <div class="auth__block">
      <label for="input">password</label>
      <input
        type="password"
        class="auth__input inpt"
        placeholder=""
        v-model="currentUser.password"
      >
    </div>
    
    <button
      type="submit"
      class="auth__button btn"
    >Login</button>

    <router-link :to="{ name: 'register' }" class="auth__redirect">haven't an account?</router-link>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '@/store';
import { signIn } from '@/assets/js/modules/module.auth';

const currentUser = ref({
  email: '',
  password: ''
});

const router = useRouter();
const store = useStore();

const onSubmit = async() => {
  const status = await signIn(currentUser.value);

  if(!status) return;

  // store.currentUser = {
  //   name: getUser().displayName,
  //   email: getUser().email
  // }

  currentUser.value = {
    email: '',
    password: ''
  };

  router.push({ name: 'main' });
};
</script>


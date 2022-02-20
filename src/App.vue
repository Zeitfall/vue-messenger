<template>
  <div class="wrapper">
    <component :is="route.meta.layout === 'auth' ? auth : main">
      <router-view/>
    </component>
  </div>
</template>

<script setup>
import auth from '@/layouts/auth';
import main from '@/layouts/main';

import { computed, onBeforeMount, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';

import app from '@/db/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import loadCurrentUser from '@/assets/js/modules/module.loadCurrentUser';

const route = useRoute();
const router = useRouter();


/** loading current user */
loadCurrentUser();

</script>

<style lang="scss">
/** global */
@import '@/assets/scss/_null.scss';
@import '@/assets/scss/_global.scss';

/** components */
@import '@/assets/scss/auth.scss';
@import '@/assets/scss/main.scss';

/** fonts */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700&display=swap');

* {
  padding: 0;
  margin: 0;
}

body {
  font-family: 'Inter', sans-serif;
}

.wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  overflow: hidden;
}

[class*="__container"] {
  max-width: 360px;
  padding: 0 20px;
  margin: 0 auto;
}
</style>

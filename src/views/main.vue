<template>
  <main class="main">
    <div class="main__container">
      <div class="main__body"
        :class="{main__body_active: store.burgerIsActive}"
      >
        <chatCreate v-if="store.showModals.createChat"/>      
        <chatList/>
        <chatSection/>
      </div>
    </div>
  </main>
</template>

<script setup>
import chatList from '@/components/chatList';
import chatSection from '@/components/chatSection';
import chatCreate from '@/components/chatCreate';

import { useStore } from '@/store';

const store = useStore();
</script>

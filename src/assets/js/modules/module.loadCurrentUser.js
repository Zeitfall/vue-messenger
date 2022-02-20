import { onBeforeMount } from 'vue';
import app from '@/db/database';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useStore } from '@/store';

const loadCurrentUser = () => {
  const store = useStore();

  onBeforeMount(() => {
    const auth = getAuth(app);
  
    onAuthStateChanged(auth, user => {
      if(!user) return;
  
      store.currentUser = {
        name: user.displayName,
        email: user.email
      };
    });
  });
};

export default loadCurrentUser;

/** 
 * этот модуль возвращает текущий выбранный чат.
 * он используется для модуля module.chatPushMessage, 
 * чтобы тот знал в какой чат отправлять сообщение.
*/

import app from '@/db/database';
import {
  ref,
  get,
  child,
  getDatabase, 
  onValue
} from "firebase/database";

import { ref as cref } from 'vue';
import { useStore } from '@/store';

const tmpChat = cref({});
const store = useStore();

const chatGetCurrent = async() => {
  try {
    const chatKey = localStorage.getItem('CURRENT_CHAT') ? localStorage.getItem('CURRENT_CHAT') : '';
    if(!chatKey) return;

    const db = getDatabase();
    const dbRef = ref(db);
    const response = await get(child(dbRef, `/chats/${chatKey}`));

    if(!response.exists()) return;

    onValue(ref(db, `/chats/${chatKey}`), snapshot => {
      store.currentChat = snapshot.val();
      store.currentChat['key'] = chatKey;
    });

  } catch(error) { console.error(error); }
};

export default chatGetCurrent;

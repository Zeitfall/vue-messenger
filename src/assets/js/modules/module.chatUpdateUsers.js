import app from '@/db/database';
import {
  ref,
  get,
  child,
  getDatabase, 
  update
} from "firebase/database";

/**
 * PATTERN
 * 
 * name,
 * users: [],
 * maxUsers: maxUsers || 10,
 * messages: [],
 */

const chatUpdateUsers = async(chat, user) => {
  try {
    // console.log(chat, user);

    const db = getDatabase();
    const dbRef = ref(db);
    const response = await get(child(dbRef, `/chats/${chat.key}/users`));
    const updates = {};

    if(chat.users.length === +chat.maxUsers) { return alert('sorry, but chat is full! :('); }

    if(response.exists()) {
      // just updating existing branch

      const tmpUsers = chat.users;
      
      if(tmpUsers.some(u => u.email === user.email)) return;
      tmpUsers.push(user);

      updates[`/chats/${chat.key}/users/`] = tmpUsers;
      update(dbRef, updates);
    } else {
      // copying the whole chat and adding NON empty keys + values

      updates[`/chats/${chat.key}/`] = {
        name: chat.name,
        users: new Array(user), /** !!!changes are here!!! */
        maxUsers: chat.maxUsers,
        messages: chat.messages || []
      };

      update(dbRef, updates);
    }

  } catch(error) { alert(error); }
};

export default chatUpdateUsers;

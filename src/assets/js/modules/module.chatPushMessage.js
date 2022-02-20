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
 * user: { name: 'NAME' }
 * message: { content: 'Hi there!' }
 */

const sentTime = () => {
  const date = new Date();
  const localeSpecificTime = date.toLocaleTimeString('en-US');
  return localeSpecificTime.replace(/:\d+ /, ' ');
};

const chatPushMessage = async(user, chat, message) => {
  // console.log(user, chat, message);
  
  try {
    const db = getDatabase();
    const dbRef = ref(db);
    const response = await get(child(dbRef, `/chats/${chat.key}/messages`));
    const updates = {};

    if(response.exists()) {
      // just updating existing branch

      const newMessage = {
        key: new Date().getMilliseconds() + new Date().getSeconds(),
        time: sentTime(),
        user: { name: user.name },
        message: { content: message }
      };

      const tmpMessages = chat.messages;
      tmpMessages.push(newMessage);

      updates[`/chats/${chat.key}/messages/`] = tmpMessages;

      update(dbRef, updates);
    } else {
      // copying the whole chat and adding NON empty keys + values

      const newMessage = {
        key: new Date().getMilliseconds() + new Date().getSeconds(),
        time: sentTime(),
        user: { name: user.name },
        message: { content: message }
      };

      updates[`/chats/${chat.key}/`] = {
        name: chat.name,
        users: new Array(user),
        maxUsers: chat.maxUsers,
        messages: new Array(newMessage) /** !!!changes are here!!! */
      };

      update(dbRef, updates);
    }

  } catch(error) { console.error(error); }
};

export default chatPushMessage;

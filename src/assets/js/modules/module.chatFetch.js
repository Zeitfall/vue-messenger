/** 
 * этот модуль возвращает список чатов.
*/

import { getDatabase, ref, onValue} from "firebase/database";
import { ref as cref } from 'vue';

const chatList = cref([]);
const db = getDatabase();
const branchRef = ref(db, 'chats');

onValue(branchRef, snapshot => {
  const tmpArray = [];

  if(!snapshot.val()) return;

  for(const c of Object.entries(snapshot.val())) {
    tmpArray.push({
      key: c[0],
      name: c[1].name,
      users: c[1].users || [],
      maxUsers: c[1].maxUsers,
      messages: c[1].messages || []
    });
  }

  chatList.value = tmpArray;
});

export default chatList;

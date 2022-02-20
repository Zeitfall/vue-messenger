import { getDatabase, ref, push, set } from "firebase/database";

const createChat = ({ name, maxUsers }) => {
  const db = getDatabase();
  const branchRef = ref(db, 'chats');
  const childRef = push(branchRef);

  set(childRef, {
    name,
    users: [],
    maxUsers: maxUsers || 10,
    messages: [],
  });

  return !name ? false : true;
};

export default createChat;

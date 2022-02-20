
import app from '@/db/database';
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  signOut as signUserOut
} from "firebase/auth"

/** sign in */
export const signIn = async({ email, password }) => {
  try {
    const auth = getAuth(app);
    const response = await signInWithEmailAndPassword(auth, email, password);

    return true;
  } catch(error) {
    alert(error);

    return false;
  }
}

/** sign out */
export const signOut = async() => {
  try {
    const auth = getAuth(app);
    await signUserOut(auth);
    return true;
  } catch(error) {
    alert(error);
    return false;
  }
};

/** sign up */
export const signUp = async({ name, email, password }) => {
  try {
    const auth = getAuth(app);
    const response = await createUserWithEmailAndPassword(auth, email, password);

    await updateProfile(auth.currentUser, { displayName: name });

    return true;
  } catch(error) {
    alert(error);

    return false;
  }
}

// export default signIn;
// export default signOut;
// export default signUp;

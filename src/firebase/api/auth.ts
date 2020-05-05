import { db, auth } from "@/firebase/config";
import store from "@/store";
import firebase from 'firebase';

export const login = async (mail: string, password: string): Promise<Object | null> => {
  try {
    let result = await
      auth
        .signInWithEmailAndPassword(mail, password);

    if (result.user !== null && result.user.emailVerified) {
      return null;
    }
    return result.user;

  } catch (error) {
    return error;
  }
};

export const sendVerificationEmail = async (user: firebase.User): Promise<void> => {
  try {
    return user.sendEmailVerification();
  } catch (error) {
    return error;
  }
};

export const signup = async (mail: string, password: string): Promise<void | null> => {
  try {
    let result = await auth
      .createUserWithEmailAndPassword(mail, password);
    if (result.user) {
      await sendVerificationEmail(result.user);
      return null;
    }
  } catch (error) {
    return error;
  }
}

export const checkUserData = (user: firebase.User): void => {
  const userData = {
    name: user.displayName,
    email: user.email,
    imageURL: user.photoURL,
    uid: user.uid,
  };
  db.collection('users').doc(user.uid).get().then((doc) => {
    if (!doc.exists) {
      console.log("User doesn't have data, creating teacher node.");
      db.collection('users').doc(user.uid).set(userData);
    } else {
      //"User already has data, doing nothing.");
    }
    let currentUser = store.state.app.user;
    let data = doc.data() || {};
    console.log(data);
    currentUser.ownedTutorials = data['ownedTutorials'];
    currentUser.state = data['state'];
    currentUser.institution = data['institution'];
    store.state.app.user = currentUser;
  });
}

export const userCanLogin = (user: firebase.User): boolean => {
  let creationTime = user.metadata.creationTime || '';

  if (user.emailVerified) {
    return true;
  }

  let difference = Date.now() - Date.parse(creationTime);

  difference = Math.floor((difference % 86400000) / 3600000);

  if (difference < 24) {
    return true;
  }

  return false;
}

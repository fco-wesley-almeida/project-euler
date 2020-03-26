import {TutorialCase} from "@/firebase/models/case";
import {db} from "@/firebase/db";
import firebase from 'firebase';

export const login = async (mail: string, password: string): Promise<string | null> => {
  try {
    await firebase
      .auth()
      .signInWithEmailAndPassword(mail, password);
    return null;
  } catch(error){
    return error;
  }
};

export const signup = async (mail: string, password: string): Promise<string | null> => {
  try{
  await firebase
    .auth()
    .createUserWithEmailAndPassword(mail, password);
  return null;
  } catch(error){
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
      console.log("User already has data, doing nothing.");
    }
  });
}

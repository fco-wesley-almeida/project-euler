
import { db } from '../db';
import { Tutorial } from '@/models/tutorial';
import firestore from "@firebase/firestore-types";

export const createTutorial = (tutorial: Tutorial) : Promise<firestore.DocumentReference> => {
  return db.collection("tutorials").add(tutorial);
};

export const updateTutorial = (tutorial: Tutorial) : Promise<void> => {
  return db.collection("tutorials").doc(tutorial.id).update(tutorial);
};

export const deleteTutorial = (tutorial: Tutorial) : Promise<void> => {
  return db.collection("tutorials").doc(tutorial.id).delete();
};

export const tutorialFromSnapshot = (snapshot: firestore.DocumentSnapshot) : Tutorial => {
  let tutorial = snapshot.data() as Tutorial;
  tutorial.id = snapshot.id;
  return tutorial;
};

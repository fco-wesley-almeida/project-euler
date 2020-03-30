
import { db, Timestamp } from '../config';
import { Tutorial } from '@/firebase/models/tutorial';
import firebase from 'firebase';

export const createTutorial = (tutorial: Tutorial, teacherID: string, teacherName: string): Promise<firebase.firestore.DocumentReference> => {
  tutorial.teacherID = teacherID;
  tutorial.teacherName = teacherName;
  tutorial.creationDate = Timestamp.fromDate(new Date());
  let object = tutorial.toObject();
  return db.collection("tutorials").add(object);
};

export const updateTutorial = (tutorial: Tutorial): Promise<void> => {
  return db.collection("tutorials").doc(tutorial.id).update(tutorial);
};

export const deleteTutorial = (tutorial: Tutorial): Promise<void> => {
  return db.collection("tutorials").doc(tutorial.id).delete();
};

export const tutorialFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): Tutorial => {
  let tutorial = snapshot.data() as Tutorial;
  tutorial.id = snapshot.id;
  return tutorial;
};

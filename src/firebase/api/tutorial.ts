
import { db, Timestamp, FieldValue } from '../config';
import { Tutorial } from '@/firebase/models/tutorial';
import firebase from 'firebase';

export const createTutorial = async (tutorial: Tutorial, teacherID: string, teacherName: string): Promise<String | null> => {
  try {
    tutorial.teacherID = teacherID;
    tutorial.teacherName = teacherName;
    tutorial.creationDate = Timestamp.fromDate(new Date());

    let object = tutorial.toObject();
    let docRef = db.collection("tutorials").doc();
    await db.collection('users').doc(teacherID).update({
      ownedTutorials: FieldValue.arrayUnion(docRef.id),
    });
    await db.collection("tutorials").doc(docRef.id).set(object);
    return docRef.id;
  } catch {
    return null;
  }
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

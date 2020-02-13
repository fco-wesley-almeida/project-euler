
import { db } from '../db';
import firebase from 'firebase';
import { TutorialCase } from '@/models/case';

export const createCase = (tutorialCase: TutorialCase, tutorialID: string, caseID: string): Promise<firebase.firestore.DocumentReference> => {
  tutorialCase.tutorialID = tutorialID;
  tutorialCase.creationDate = firebase.firestore.Timestamp.fromDate(new Date());
  let obj = new Object();
  Object.assign(obj, tutorialCase);
  Object.keys(obj).forEach(key => obj[key] === undefined ? delete obj[key] : {});
  return db.collection("cases").add(obj);
};

export const updateCase = (tutorialCase: TutorialCase, id: string | undefined): Promise<void> => {
  return db.collection("cases").doc(id).update(tutorialCase);
};

export const removeCaseFromTutorial = (caseID: string, tutorialID: string) : void => {
  db.collection('cases').doc(caseID).delete();
};

export const caseFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): TutorialCase => {
  let tutorialCase = snapshot.data() as TutorialCase;
  tutorialCase.id = snapshot.id;
  return tutorialCase;
};
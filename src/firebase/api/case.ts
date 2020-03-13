
import { db } from '../db';
import firebase from 'firebase';
import { TutorialCase } from '@/firebase/models/case';

export const getNewID = (): string => db.collection("cases").doc().id;

export const setCaseContent = (content: Array<any>, id: string | undefined): Promise<void> => {
  return db.collection("cases").doc(id).update({content});
};

export const updateCase = (tutorialCase: TutorialCase, id: string | undefined): Promise<void> => {
  let obj = tutorialCase.toObject()
  return db.collection("cases").doc(id).update(obj);
};

export const setCase = (tutorialCase: TutorialCase, id: string | undefined): Promise<void> => {
  let obj = tutorialCase.toObject()
  return db.collection("cases").doc(id).set(obj);
};

export const removeCaseFromTutorial = (caseID: string, tutorialID: string) : void => {
  db.collection('cases').doc(caseID).delete();
};

export const caseFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): TutorialCase => {
  let tutorialCase = snapshot.data() as TutorialCase;
  tutorialCase.id = snapshot.id;
  return tutorialCase;
};

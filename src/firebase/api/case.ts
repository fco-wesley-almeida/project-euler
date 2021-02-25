
import { db } from '../config';
import firebase from 'firebase';
import { TutorialCase } from '@/firebase/models/case';

export const getNewID = (): string => db.collection("cases").doc().id;

export const setCaseContent = (content: Array<any>, id: string | undefined): Promise<void> => {
  return db.collection("cases").doc(id).update({content});
};

export const setCaseReferences = (references: Array<any>, id: string | undefined): Promise<void> => {
  return db.collection("cases").doc(id).update({references});
};

export const setCaseAnnexes = (annexes: Array<any>, id: string | undefined): Promise<void> => {
  return db.collection("cases").doc(id).update({annexes});
};

export const updateCase = (tutorialCase: TutorialCase, id: string | undefined): Promise<void> => {
  let obj = tutorialCase.toObject()
  return db.collection("cases").doc(id).update(obj);
};

export const finishCase = (id: string) => {
  return db.collection("cases").doc(id).update({ status: "finished"});
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

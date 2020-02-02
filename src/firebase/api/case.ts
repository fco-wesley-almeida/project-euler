
import { db } from '../db';
import firebase from 'firebase';
import { TutorialCase } from '@/models/case';

export const createCase = (tutorialCase: TutorialCase, tutorialID: string): Promise<firebase.firestore.DocumentReference> => {
  tutorialCase.tutorialID = tutorialID;
  tutorialCase.creationDate = firebase.firestore.Timestamp.fromDate(new Date());
  
  return db.collection("cases").add(JSON.parse(JSON.stringify(tutorialCase)));
};

export const updateCase = (tutorialCase: TutorialCase): Promise<void> => {
  return db.collection("cases").doc(tutorialCase.id).update(tutorialCase);
};

export const removeCaseFromTutorial = (caseID: string, tutorialID: string) : void => {
  db.collection('cases').doc(caseID).delete();
};

export const caseFromSnapshot = (snapshot: firebase.firestore.DocumentSnapshot): TutorialCase => {
  let tutorialCase = snapshot.data() as TutorialCase;
  tutorialCase.id = snapshot.id;
  return tutorialCase;
};

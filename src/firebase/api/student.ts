
import { db, FieldValue } from '../config';

export const removeStudentFromTutorial = (studentID: string, tutorialID: string) : void => {
  db.collection('users').doc(studentID).update({
    tutorials: FieldValue.arrayRemove(tutorialID),
  });
  db.collection('tutorials').doc(tutorialID).update({
    students: FieldValue.arrayRemove(studentID),
  });
};

export const addStudentToTutorial = (studentID: string, tutorialID: string) : void => {
  db.collection('users').doc(studentID).update({
    tutorials: FieldValue.arrayUnion(tutorialID),
  });
  db.collection('tutorials').doc(tutorialID).update({
    students: FieldValue.arrayUnion(studentID),
  });
};

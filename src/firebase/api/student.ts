
import { db, FieldValue } from '../db';

export const removeStudentFromTutorial = (studentID: string, tutorialID: string) : void => {
  db.collection('students').doc(studentID).update({
    tutorials: FieldValue.arrayRemove(this.$route.params.tutorialID),
  });
  db.collection('tutorials').doc(tutorialID).update({
    students: FieldValue.arrayRemove(this.receivedStudent.id),
  });
};

export const addStudentToTutorial = (studentID: string, tutorialID: string) : void => {
    db.collection('students').doc(studentID).update({
        tutorials: FieldValue.arrayRemove(this.$route.params.tutorialID),
    });
    db.collection('tutorials').doc(tutorialID).update({
        students: FieldValue.arrayRemove(this.receivedStudent.id),
    });
};

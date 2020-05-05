
import { db, FieldValue } from '../config';
import {Group} from "@/firebase/models/group";

export const createGroups = (caseID: string, groups: Array<Group>): Promise<void> => {
  let batch = db.batch();
    for (var group of groups) {
      let ref = db.collection("cases").doc(caseID).collection("groups").doc();
      batch.set(ref, group.toObject());
    }
    batch.update(db.collection("cases").doc(caseID), {status: "active"})
    return batch.commit();
};

export const addUserToGroup = (caseID: string, groupID: string, userID: string): Promise<void> => {
  let ref = db.collection("cases").doc(caseID).collection("groups").doc(groupID);
  return ref.update({
    participants: FieldValue.arrayUnion(userID),
  });
};

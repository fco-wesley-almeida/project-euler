
import { db } from '../db';
import firebase from 'firebase';
import { TutorialCase } from '@/models/case';
import {Group} from "@/models/group";

export const createGroups = (caseID: string, groups: Array<Group>): Promise<void> => {
  let batch = db.batch();
    for (var group of groups) {
      let ref = db.collection("cases").doc(caseID).collection("groups").doc();
      batch.set(ref, group.toObject());
    }
    batch.update(db.collection("cases").doc(caseID), {status: "active"})
    return batch.commit();
};

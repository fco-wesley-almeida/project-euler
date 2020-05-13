import firebase from 'firebase';
import { Timestamp } from '../config';
export class Tutorial {
    id: string | undefined = undefined;
    name: string = "";
    password: string = "";
    date: firebase.firestore.Timestamp | null = null;
    creationDate: firebase.firestore.Timestamp | null = Timestamp.fromDate(new Date());
    description: string = "";
    fixedGroups: boolean = false;
    teacherID: string = "";
    teacherName: string = "";
    finishedCases: number = 0;
    scheduledCases: number = 0;
    currentCase: string | null = null;
    cases: Array<String> = [];
    students: Array<String> = [];

    public constructor(init?: Partial<Tutorial>) {
        return Object.assign(this, init);
    }

    public toObject() {
        let obj = new Object();
        Object.assign(obj, this);
        Object.keys(obj).forEach(key => (obj as any)[key] === undefined ? delete (obj as any)[key] : {});
        return obj;
    }
}

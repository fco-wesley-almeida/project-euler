import firebase from 'firebase';
export class Tutorial {
    id: string | null = null;
    name: string = "";
    password: string = "";
    date: firebase.firestore.Timestamp | null = null;
    creationDate: firebase.firestore.Timestamp | null = null;
    description: string = "";
    fixedGroups: boolean = false;
    teacherID: string = "";
    teacherName: string = "";
    finishedCases: number = 0;
    scheduledCases: number = 0;
    currentCase: string | null = null;
    cases: Array<String> = [];
    students: Array<String> = [];

    public constructor(init?:Partial<Tutorial>) {
        return Object.assign(this, init);
    }
}

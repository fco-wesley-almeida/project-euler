import firestore from "@firebase/firestore-types";
export class Tutorial {
    id: string | undefined = undefined;
    name: string = "";
    password: string = "";
    date: firestore.Timestamp | null = null;
    creationDate: firestore.Timestamp | null = null;
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
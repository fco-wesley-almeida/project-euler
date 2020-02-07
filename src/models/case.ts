import firebase from 'firebase';
export class TutorialCase {
    id: string | undefined = undefined;
    title: string = "";
    tutorialID: string = "";
    content: Array<any> = [];
    studyObjectives: Array<any> = [];
    creationDate: firebase.firestore.Timestamp | null = null;
    status : "scheduled" | "active" | "finished" = "scheduled";

    public constructor(init?:Partial<TutorialCase>) {
        return Object.assign(this, init);
    }
}
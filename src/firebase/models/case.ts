import firebase from 'firebase';
export class TutorialCase {
    id: string | undefined = undefined;
    title: string = "";
    tutorialID: string = "";
    content: Array<any> = [];
    studyObjectives: Array<any> = [];
    currentStep: number = 1;
    creationDate: firebase.firestore.Timestamp | null = null;
    status : "scheduled" | "active" | "finished" = "scheduled";

    public constructor(init?:Partial<TutorialCase>) {
        return Object.assign(this, init);
    }

    public toObject(){
      let obj = new Object();
      Object.assign(obj, this);
      Object.keys(obj).forEach(key => (obj as any)[key] === undefined ? delete (obj as any)[key] : {});
      return obj;
    }
}
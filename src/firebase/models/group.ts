export class Group {
  id: string | undefined = undefined;
  title: string = "";
  participants: Array<string> = [];
  reporterID: string = "";
  coordinatorID: string | null = null;

  public constructor(init?:Partial<Group>) {
    return Object.assign(this, init);
  }

  public toObject(){
    let obj = new Object();
    Object.assign(obj, this);
    Object.keys(obj).forEach(key => (obj as any)[key] === undefined ? delete (obj as any)[key] : {});
    return obj;
  }
}

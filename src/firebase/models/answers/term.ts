export class TermAnswer {
  id: string | undefined = undefined;
  terms: Array<string> = [];

  public constructor(init?:Partial<TermAnswer>) {
    return Object.assign(this, init);
  }

  public toObject(){
    let obj = new Object();
    Object.assign(obj, this);
    Object.keys(obj).forEach(key => (obj as any)[key] === undefined ? delete (obj as any)[key] : {});
    return obj;
  }
}

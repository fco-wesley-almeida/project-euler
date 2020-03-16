export class TermRankingEntry {
  id: string | undefined = undefined;
  term: string = "";
  numberOfVotes: number = 0;
  voters: Array<string> = [];

  public constructor(init?:Partial<TermRankingEntry>) {
    return Object.assign(this, init);
  }

  public toObject(){
    let obj = new Object();
    Object.assign(obj, this);
    Object.keys(obj).forEach(key => (obj as any)[key] === undefined ? delete (obj as any)[key] : {});
    return obj;
  }
}

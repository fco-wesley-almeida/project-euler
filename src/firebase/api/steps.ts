import {db} from '../db';
import firebase from 'firebase';
import {TermAnswer} from '../models/answers/term';
import {TermRankingEntry} from "@/firebase/models/answers/termRankingEntry";

export const advanceStep = async (id: string, currentStep: number): Promise<void> => {
  const caseRef = db.collection("cases").doc(id);
  let newStep = currentStep + 1;
  return caseRef.update({currentStep: newStep});
};

export const proccessTerms = async (caseID: string, answers: Array<any>): Promise<void> => {
  let rankingEntries = new Map<string, TermRankingEntry>();
  console.log(answers);
  answers.forEach((answerObj) => {
    let answer = new TermAnswer(answerObj);
    answer.id = answerObj.id;
    answer.terms.forEach((term) => {
      let entry = rankingEntries.get(term);
      if (entry == undefined) {
        entry = new TermRankingEntry();
        entry.term = term;
      }
      entry.numberOfVotes += 1;
      entry.voters.push(answer.id || '');
      rankingEntries.set(term, entry);
    })
  });

  let batch = db.batch();

  rankingEntries.forEach((entry, key) => {
    const entryRef = db.collection(`timelines/${caseID}/step1Ranking`).doc();
    batch.set(entryRef, entry.toObject());
  });

  await advanceStep(caseID, 1);

  return batch.commit();
}


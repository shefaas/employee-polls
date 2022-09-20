import { VOTE_ON_QUESTION } from "./shared";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const SAVE_QUESTION = "SAVE_QUESTION";

export function getQuestions(questions) {
  return {
    type: GET_QUESTIONS,
    questions,
  };
}

export function voteOnQuestion({ authedUser, qid, answer }) {
  return {
    type: VOTE_ON_QUESTION,
    voteData: {
      authedUser,
      qid,
      answer,
    },
  };
}

export function saveQuestion(question) {
  return {
    type: SAVE_QUESTION,
    question,
  };
}

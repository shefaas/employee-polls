import { showLoading, hideLoading } from "react-redux-loading-bar";
import { saveQuestionAnswer } from "../utils/api";

export const GET_QUESTIONS = "GET_QUESTIONS";
export const VOTE_ON_QUESTION = "VOTE_ON_QUESTION";

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

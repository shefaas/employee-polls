import { VOTE_ON_QUESTION } from "./shared";

export const GET_USERS = "GET_USERS";
export const UPDATE_USER_QUESTION = "UPDATE_USER_QUESTION";

export function getUsers(users) {
  return {
    type: GET_USERS,
    users,
  };
}

export function voteOnQuestionForUser({ authedUser, qid, answer }) {
  return {
    type: VOTE_ON_QUESTION,
    voteData: {
      authedUser,
      qid,
      answer,
    },
  };
}

export function saveQuestionForUser(question) {
  return {
    type: UPDATE_USER_QUESTION,
    question,
  };
}

export const ADD_VOTE_TO_USER = "ADD_VOTE_TO_USER";
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
    type: ADD_VOTE_TO_USER,
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

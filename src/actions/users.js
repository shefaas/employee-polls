export const GET_USERS = "GET_USERS";
export const VOTE_ON_QUESTION = "VOTE_ON_QUESTION";

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

import { GET_USERS } from "../actions/users";
import { VOTE_ON_QUESTION } from "../actions/shared";
import { UPDATE_USER_QUESTION } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        ...action.users,
      };
    case VOTE_ON_QUESTION:
      const answer = action.voteData.answer;
      const qid = action.voteData.qid;

      const uid = action.voteData.authedUser;

      return {
        ...state,
        [uid]: {
          ...state[uid],
          answers: {
            ...state[uid].answers,
            [qid]: answer,
          },
        },
      };
    case UPDATE_USER_QUESTION:
      const questionID = action.question.id;
      const user = action.question.author;

      return {
        ...state,
        [user]: {
          ...state[user],
          questions: [...state[user].questions, questionID],
        },
      };
    default:
      return state;
  }
}

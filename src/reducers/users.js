import { GET_USERS, VOTE_ON_QUESTION } from "../actions/users";

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
    default:
      return state;
  }
}

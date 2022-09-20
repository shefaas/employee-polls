import { GET_QUESTIONS, VOTE_ON_QUESTION } from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case GET_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };
    case VOTE_ON_QUESTION:
      const answer = action.voteData.answer;
      const id = action.voteData.qid;

      return {
        ...state,
        [id]: {
          ...state[id],
          [answer]: {
            ...state[id][answer],
            votes: [...state[id][answer].votes, action.voteData.authedUser],
          },
        },
      };
    default:
      return state;
  }
}

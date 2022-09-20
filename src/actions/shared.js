import {
  getInitialData,
  saveQuestionAnswer,
  createQuestion,
} from "../utils/api";
import { getUsers, saveQuestionForUser, voteOnQuestionForUser } from "./users";
import { getQuestions, voteOnQuestion, saveQuestion } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

export const VOTE_ON_QUESTION = "VOTE_ON_QUESTION";

// const AUTHED_USER_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(hideLoading());
      })
      .catch((error) => {
        console.log({ error });
      });
  };
}

export function handleVoteOnQuestion(qid, answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();

    dispatch(showLoading());
    dispatch(voteOnQuestion({ authedUser, qid, answer }));
    dispatch(voteOnQuestionForUser({ authedUser, qid, answer }));

    return saveQuestionAnswer({ authedUser, qid, answer })
      .then(() => {
        dispatch(hideLoading());
      })
      .catch((error) => {
        console.log({ error });
      });
  };
}

export function handleSaveQuestion(option1, option2) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return createQuestion({
      author: authedUser,
      optionOneText: option1,
      optionTwoText: option2,
    })
      .then((question) => {
        dispatch(saveQuestion(question));
        dispatch(saveQuestionForUser(question));
        dispatch(hideLoading());
      })
      .catch((error) => {
        console.log({ error });
      });
  };
}

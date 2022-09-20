import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { getUsers, voteOnQuestionForUser } from "./users";
import { getQuestions, voteOnQuestion } from "./questions";
import { setAuthedUser } from "./authedUser";
import { showLoading, hideLoading } from "react-redux-loading-bar";

const AUTHED_USER_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    dispatch(showLoading());
    return getInitialData()
      .then(({ users, questions }) => {
        console.log("kfkfkf");
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(setAuthedUser(AUTHED_USER_ID));
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

    console.log({ authedUser });
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

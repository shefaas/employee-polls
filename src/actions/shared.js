import { getInitialData } from "../utils/api";
import { getUsers } from "./users";
import { getQuestions } from "./questions";
import { setAuthedUser } from "./authedUser";

const AUTHED_USER_ID = "tylermcginnis";

export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(({ users, questions }) => {
        console.log("kfkfkf");
        dispatch(getUsers(users));
        dispatch(getQuestions(questions));
        dispatch(setAuthedUser(AUTHED_USER_ID));
      })
      .catch((error) => {
        console.log({ error });
      });
  };
}

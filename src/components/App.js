import { useEffect, Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./NavBar";
import Home from "./Home";
import { handleInitialData } from "../actions/shared";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
    const { users, questions, authedUser } = props;
    console.log({ users });
    console.log({ questions });
    console.log({ authedUser });
  }, []);

  return (
    <Fragment>
      <LoadingBar />
      {props.loading === true ? null : (
        <div className="container">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/questions/:question_id" element={<div></div>} />
            <Route path="/add" element={<div></div>} />
          </Routes>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ users, questions, authedUser }) => ({
  users,
  questions,
  authedUser,
  loading: authedUser === null,
});
export default connect(mapStateToProps)(App);

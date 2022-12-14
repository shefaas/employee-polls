import { useEffect, Fragment } from "react";
import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";

import NavBar from "./NavBar";
import Home from "./Home";
import { handleInitialData } from "../actions/shared";

import "bootstrap/dist/css/bootstrap.min.css";
import Question from "./Question";
import Leaderboard from "./Leaderboard";
import NewQuestion from "./NewQuestion";
import Login from "./Login";
import NotFound404 from "./NotFound404";

function App(props) {
  useEffect(() => {
    props.dispatch(handleInitialData());
  }, []);

  return (
    <Fragment>
      {!props.authedUser ? (
        <div>
          <p>{props.testingValue}</p>
          <NavBar />
          <Login />
        </div>
      ) : (
        <div>
          <NavBar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/questions/:id" element={<Question />} />
            <Route path="/leaderboard/" element={<Leaderboard />} />
            <Route path="/add" element={<NewQuestion />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<NotFound404 />} />
          </Routes>
        </div>
      )}
    </Fragment>
  );
}

const mapStateToProps = ({ authedUser }, { testingValue }) => ({
  authedUser,
  testingValue,
});
export default connect(mapStateToProps)(App);

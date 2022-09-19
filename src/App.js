import { useEffect, Fragment } from "react";
// import LoadingBar from "react-redux-loading-bar";
import { Routes, Route } from "react-router-dom";

import NavBar from "./components/NavBar";

function App() {
  return (
    <Fragment>
      {/* <LoadingBar /> */}
      <div className="container">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<div>hola</div>} />
          <Route path="/questions/:question_id" element={<div></div>} />
          <Route path="/add" element={<div></div>} />
        </Routes>
      </div>
    </Fragment>
  );
}

export default App;

import { connect } from "react-redux";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import LoadingBar from "react-redux-loading-bar";

import Questions from "./Questions";

const Home = ({ loading }) => {
  return (
    <div>
      <LoadingBar />
      {loading === true ? null : (
        <div>
          <Tabs
            defaultActiveKey="unanswered"
            className="mb-3"
            fill
            style={{ margin: "30px" }}
          >
            <Tab eventKey="unanswered" title="Unanswered">
              <Questions tab="unanswered" />
            </Tab>
            <Tab eventKey="answered" title="Answered">
              <Questions tab="answered" />
            </Tab>
          </Tabs>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  loading: authedUser === null,
});

export default connect(mapStateToProps)(Home);

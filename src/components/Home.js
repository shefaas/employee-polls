import { connect } from "react-redux";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import Questions from "./Questions";

const Home = (props) => {
  const { answeredIDs, unansweredIDs, authedUser, dispatch } = props;

  return (
    <div>
      <Tabs defaultActiveKey="unanswered" className="mb-3" fill>
        <Tab eventKey="unanswered" title="Unanswered">
          <Questions tab="unanswered" />
        </Tab>
        <Tab eventKey="answered" title="Answered">
          <Questions tab="answered" />
        </Tab>
      </Tabs>
    </div>
  );
};

const mapStateToProps = ({ users, questions, authedUser }) => {
  const answeredIDs = Object.keys(users[authedUser].answers);

  const unansweredIDs = Object.keys(questions).filter((questionID) => {
    const filteredQuestion = answeredIDs.filter((answeredID) => {
      if (answeredID === questionID) return questionID;
      else return null;
    });

    if (filteredQuestion.length === 0) return questionID;
  });

  return {
    unansweredIDs,
    answeredIDs,
    authedUser,
  };
};

export default connect(mapStateToProps)(Home);

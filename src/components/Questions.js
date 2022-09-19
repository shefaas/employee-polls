import { connect } from "react-redux";

import QuestionCard from "./QuestionCard";

const Questions = (props) => {
  const { questions, unansweredIDs, answeredIDs, authedUser, tab, dispatch } =
    props;
  return tab === "unanswered" ? (
    <div>
      <ul
        style={{
          paddingTop: "10px",
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignContent: "stretch",
        }}
      >
        {unansweredIDs.map((id) => (
          <li key={id} style={{ padding: "5px" }}>
            <QuestionCard id={id} />
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>
      <ul
        style={{
          paddingTop: "10px",
          listStyle: "none",
          display: "flex",
          flexDirection: "row",
          flexWrap: "wrap",
          justifyContent: "flex-start",
          alignContent: "stretch",
        }}
      >
        {answeredIDs.map((id) => (
          <li key={id} style={{ padding: "5px" }}>
            <QuestionCard id={id} />
          </li>
        ))}
      </ul>
    </div>
  );
};

const mapStateToProps = ({ users, questions, authedUser }, { tab }) => {
  const answeredIDs = Object.keys(users[authedUser].answers).sort(
    (a, b) => questions[b].timestamp - questions[a].timestamp
  );

  const unansweredIDs = Object.keys(questions).filter((questionID) => {
    const filteredQuestion = answeredIDs.filter((answeredID) => {
      if (answeredID === questionID) return questionID;
      else return null;
    });

    if (filteredQuestion.length === 0) return questionID;
  });

  return {
    questions,
    unansweredIDs: unansweredIDs.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    answeredIDs,
    authedUser,
    tab,
  };
};

export default connect(mapStateToProps)(Questions);

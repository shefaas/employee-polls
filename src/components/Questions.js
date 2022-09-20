import { connect } from "react-redux";

import QuestionCard from "./QuestionCard";

const Questions = (props) => {
  const { unansweredIDs, answeredIDs, tab } = props;

  return tab === "unanswered" ? (
    <div>
      {unansweredIDs && unansweredIDs.length > 0 ? (
        <ul
          style={{
            margin: 0,
            padding: 0,
            paddingTop: "50px",
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {unansweredIDs.map((id) => (
            <li key={id} style={{ padding: "5px" }}>
              <QuestionCard id={id} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "170vh",
            height: "80vh",
            color: "rgb(200, 200, 200)",
          }}
        >
          No questions to show
        </p>
      )}
    </div>
  ) : (
    <div>
      {answeredIDs && answeredIDs.length > 0 ? (
        <ul
          style={{
            margin: 0,
            padding: 0,
            paddingTop: "50px",
            listStyle: "none",
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {answeredIDs.map((id) => (
            <li key={id} style={{ padding: "5px" }}>
              <QuestionCard id={id} />
            </li>
          ))}
        </ul>
      ) : (
        <p
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            alignContent: "center",
            width: "170vh",
            height: "80vh",
            color: "rgb(200, 200, 200)",
          }}
        >
          No questions to show
        </p>
      )}
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
    unansweredIDs: unansweredIDs.sort(
      (a, b) => questions[b].timestamp - questions[a].timestamp
    ),
    answeredIDs,
    tab,
  };
};

export default connect(mapStateToProps)(Questions);

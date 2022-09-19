import { connect } from "react-redux";

const Home = (props) => {
  return <div></div>;
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

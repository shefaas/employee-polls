import { connect } from "react-redux";
import { useLocation } from "react-router-dom";

import { Image, Button, Card } from "react-bootstrap";

import { formatDate, formatQuestion } from "../utils/helper";
import { handleVoteOnQuestion } from "../actions/shared";
import { useState, useEffect } from "react";

const Question = (props) => {
  const { questions, users, authedUser, dispatch } = props;

  const location = useLocation();
  const { id } = location.state;

  const [questionAnswered, setQuestionAnswered] = useState(true);

  useEffect(() => {
    const allUsersVoted = questions[id].optionOne.votes.concat(
      questions[id].optionTwo.votes
    );
    const user = allUsersVoted.filter((id) => id === authedUser);

    if (user.length > 0) setQuestionAnswered(true);
    else setQuestionAnswered(false);
  }, [questionAnswered]);

  const question = formatQuestion(questions[id], users[questions[id].author]);

  const handleVote = (option) => {
    if (!questionAnswered) {
      dispatch(handleVoteOnQuestion(id, option));
      setQuestionAnswered(true);
    }
  };

  const answer = () => {
    if (questionAnswered) {
      return users[authedUser].answers[id];
    }
  };

  const calculateVotes = (option) => {
    return questions[id][option].votes.length;
  };

  const calculatePercentage = (option) => {
    const optionOneVotes = calculateVotes("optionOne");
    const optionTwoVotes = calculateVotes("optionTwo");
    return option === "optionOne"
      ? ((optionOneVotes / (optionOneVotes + optionTwoVotes)) * 100).toFixed(0)
      : ((optionTwoVotes / (optionOneVotes + optionTwoVotes)) * 100).toFixed(0);
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignContent: "center",
        alignItems: "center",
      }}
    >
      <h3>
        {`Question By `}
        {<span style={{ fontStyle: "italic" }}>{question.name}</span>}
      </h3>
      <p>{formatDate(question.timestamp)}</p>
      <Image
        src={question.avatar}
        rounded
        style={{
          width: "20vh",
          borderStyle: "solid",
          borderWidth: "2px",
          borderRadius: "2px",
          borderColor: "rgb(200, 200, 200)",
          margin: "20px",
          marginBottom: "60px",
        }}
      />
      <h4>Would You Rather</h4>
      <div>
        {questionAnswered ? (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              columnGap: "20px",
              margin: "25px",
            }}
          >
            <Card className="text-center">
              <Card.Header>Option 1</Card.Header>
              <Card.Body>
                <Card.Title>{question.optionOne.text}</Card.Title>
                <Card.Text>
                  {`${calculateVotes("optionOne")} (${calculatePercentage(
                    "optionOne"
                  )}%) `}
                  people voted on this
                </Card.Text>
                {answer() === "optionOne" ? (
                  <Button variant="success" disabled>
                    VOTED
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Vote
                  </Button>
                )}
              </Card.Body>
            </Card>
            <Card className="text-center">
              <Card.Header>Option 2</Card.Header>
              <Card.Body>
                <Card.Title>{question.optionTwo.text}</Card.Title>
                <Card.Text>
                  {`${calculateVotes("optionTwo")} (${calculatePercentage(
                    "optionTwo"
                  )}%) `}
                  people voted on this
                </Card.Text>
                {answer() === "optionTwo" ? (
                  <Button variant="success" disabled>
                    VOTED
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    Vote
                  </Button>
                )}
              </Card.Body>
            </Card>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignContent: "center",
              alignItems: "center",
              columnGap: "20px",
              margin: "25px",
            }}
          >
            <Card className="text-center">
              <Card.Header>Option 1</Card.Header>
              <Card.Body>
                <Card.Title>{question.optionOne.text}</Card.Title>
                <Button
                  variant="outline-primary"
                  onClick={() => handleVote("optionOne")}
                >
                  Vote
                </Button>
              </Card.Body>
            </Card>
            <Card className="text-center">
              <Card.Header>Option 2</Card.Header>
              <Card.Body>
                <Card.Title>{question.optionTwo.text}</Card.Title>
                <Button
                  variant="outline-primary"
                  onClick={() => handleVote("optionTwo")}
                >
                  Vote
                </Button>
              </Card.Body>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }) => {
  return {
    questions,
    users,
    authedUser,
  };
};

export default connect(mapStateToProps)(Question);

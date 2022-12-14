import { connect } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Image, Button, Card } from "react-bootstrap";

import { formatDate, formatQuestion } from "../utils/helper";
import { handleVoteOnQuestion } from "../actions/shared";
import { useState, useEffect } from "react";
import { useRequireAuth } from "../utils/helper";
import NotFound404 from "./NotFound404";

const Question = (props) => {
  const [question, setQuestion] = useState(undefined);

  const { questions, users, authedUser, dispatch } = props;

  const param = useParams();
  const id = param.id;

  const navigate = useNavigate();

  useRequireAuth(authedUser, "/questions/id", navigate);

  useEffect(() => {
    const questionFound = Object.keys(questions).filter((q) => q === id);
    if (questionFound.length > 0) {
      setQuestion(formatQuestion(questions[id], users[questions[id].author]));
    }
  }, []);

  const [questionAnswered, setQuestionAnswered] = useState(false);

  useEffect(() => {
    if (question) {
      const allUsersVoted = questions[id].optionOne.votes.concat(
        questions[id].optionTwo.votes
      );
      const user = allUsersVoted.filter((id) => id === authedUser);

      if (user.length > 0) setQuestionAnswered(true);
      else setQuestionAnswered(false);
    }
  }, [question, questionAnswered]);

  const handleVote = (option) => {
    if (!questionAnswered) {
      console.log({ question });
      dispatch(handleVoteOnQuestion(id, option));
      setQuestionAnswered(true);
    }
  };

  const answer = () => {
    if (questionAnswered) {
      console.log(users[authedUser]);
      return users[authedUser].answers[id];
    }
  };

  const calculateVotes = (option) => {
    console.log({ question });
    return questions[id][option].votes.length;
  };

  const calculatePercentage = (option) => {
    const optionOneVotes = calculateVotes("optionOne");
    const optionTwoVotes = calculateVotes("optionTwo");

    const votesSum = optionOneVotes + optionTwoVotes;
    if (votesSum === 0) {
      return 0;
    }
    return option === "optionOne"
      ? ((optionOneVotes / votesSum) * 100).toFixed(0)
      : ((optionTwoVotes / votesSum) * 100).toFixed(0);
  };

  if (question === undefined)
    return (
      <div>
        <NotFound404 />
      </div>
    );

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

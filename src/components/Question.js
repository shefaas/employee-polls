import { connect } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { Image, Button, Card } from "react-bootstrap";

import { formatDate, formatQuestion } from "../utils/helper";
import { handleVoteOnQuestion } from "../actions/shared";
import { useState, useEffect } from "react";

const Question = (props) => {
  const { questions, users, authedUser, dispatch } = props;
  const location = useLocation();
  const { id } = location.state;
  console.log({ id });
  const [questionAnswered, setQuestionAnswered] = useState(true);

  useEffect(() => {
    const allUsersVoted = questions[id].optionOne.votes.concat(
      questions[id].optionTwo.votes
    );
    const user = allUsersVoted.filter((id) => id === authedUser);

    console.log({ user });
    if (user.length > 0) setQuestionAnswered(true);
    else setQuestionAnswered(false);
  }, []);

  const navigate = useNavigate();
  const question = formatQuestion(questions[id], users[questions[id].author]);
  //   console.log({ questionAnswered });
  const handleVote = (option) => {
    if (!questionAnswered) {
      dispatch(handleVoteOnQuestion(id, option));
      navigate("/");
    }
  };

  const answer = () => {
    console.log({ questionAnswered });
    if (questionAnswered) {
      console.log(users[authedUser].answers[id]);
      return users[authedUser].answers[id];
    }
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

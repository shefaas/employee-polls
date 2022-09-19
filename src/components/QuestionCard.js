import { connect } from "react-redux";

import { formatDate, formatQuestion } from "../utils/helper";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const QuestionCard = (props) => {
  // {props.questions[props.id].optionOne.text}

  const { questions, users, id } = props;
  const question = formatQuestion(questions[id], users[questions[id].author]);
  console.log({ question });
  console.log(questions[id].author);
  console.log(`../../public/assets/${question.avatar}`);
  return (
    <div>
      <Card style={{ width: "14rem" }}>
        <Card.Img variant="top" src={question.avatar} />
        <Card.Body>
          <Card.Title>By {question.name}</Card.Title>
          <p>{formatDate(question.timestamp)}</p>
          <Button variant="primary">View</Button>
        </Card.Body>
      </Card>
    </div>
  );
};

const mapStateToProps = ({ questions, users, authedUser }, { id }) => {
  return {
    questions,
    users,
    authedUser,
    id,
  };
};

export default connect(mapStateToProps)(QuestionCard);

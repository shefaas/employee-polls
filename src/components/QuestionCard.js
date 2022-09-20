import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { formatDate, formatQuestion } from "../utils/helper";

import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const QuestionCard = (props) => {
  const { questions, users, id } = props;
  const question = formatQuestion(questions[id], users[questions[id].author]);

  return (
    <div>
      <Card
        style={{
          width: "14rem",
        }}
      >
        <Card.Img variant="top" src={question.avatar} />
        <Card.Body>
          <Card.Title>By {question.name}</Card.Title>
          <p>{formatDate(question.timestamp)}</p>
          <Link to={`/questions/${question.id}`} state={{ id }}>
            <Button variant="secondary">View</Button>
          </Link>
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

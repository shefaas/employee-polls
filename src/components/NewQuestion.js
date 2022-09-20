import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";

import { handleSaveQuestion } from "../actions/shared";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewQuestion = (props) => {
  const navigate = useNavigate();
  const handleSubmitQuestion = (event) => {
    event.preventDefault();
    const option1 = event.target[0].value;
    const option2 = event.target[1].value;

    props.dispatch(handleSaveQuestion(option1, option2));
    navigate("/");
  };
  return (
    <div
      style={{ margin: "80px", paddingLeft: "100px", paddingRight: "100px" }}
    >
      <h4 style={{ marginTop: "40px", textAlign: "center" }}>
        Would You Rather
      </h4>
      <Form onSubmit={handleSubmitQuestion}>
        <Form.Group className="mb-3" controlId="option1">
          <Form.Label>Option 1</Form.Label>
          <Form.Control type="text" placeholder="Enter option 1" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="option2">
          <Form.Label>Option 2</Form.Label>
          <Form.Control type="text" placeholder="Enter option 2" />
        </Form.Group>
        <Button
          variant="outline-primary"
          type="submit"
          style={{ marginTop: "20px" }}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewQuestion);

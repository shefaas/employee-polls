import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { handleSaveQuestion } from "../actions/shared";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const NewQuestion = (props) => {
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");

  const navigate = useNavigate();

  const handleInput = (event, option) => {
    const value = event.target.value;
    if (option === "optionOne") setOptionOne(value);
    else setOptionTwo(value);
  };

  const handleSubmitQuestion = (event) => {
    event.preventDefault();

    const option1 = event.target[0].value;
    const option2 = event.target[1].value;

    props.dispatch(handleSaveQuestion(option1, option2));
    navigate("/");
  };

  const formCompleted = () => {
    return optionOne !== "" && optionTwo !== "";
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
          <Form.Control
            type="text"
            placeholder="Enter option 1"
            onChange={(event) => handleInput(event, "optionOne")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="option2">
          <Form.Label>Option 2</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter option 2"
            onChange={(event) => handleInput(event, "optionTwo")}
          />
        </Form.Group>
        {formCompleted() ? (
          <Button
            variant="outline-primary"
            type="submit"
            style={{ marginTop: "20px" }}
          >
            Submit
          </Button>
        ) : (
          <Button
            variant="outline-primary"
            type="submit"
            style={{ marginTop: "20px" }}
            disabled
          >
            Submit
          </Button>
        )}
      </Form>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NewQuestion);

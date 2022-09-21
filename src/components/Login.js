import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import { Image } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleSetAuthedUser = (event) => {
    dispatch(setAuthedUser(event.target.text.substring(1)));

    const state = location.state;
    if (state) {
      navigate(state);
    } else if (window.location.href.includes("/login")) {
      navigate("/");
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        width: "170vh",
        height: "80vh",
        rowGap: "50px",
      }}
    >
      <div>
        <h2>Employee Polls App 👋</h2>
      </div>
      <Dropdown data-testid="login-dropdown">
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select Login User
        </Dropdown.Toggle>

        <Dropdown.Menu
          key="users"
          style={{ padding: "10px", borderStyle: "solid", borderWidth: "1px" }}
          data-testid="login-menu"
        >
          {Object.values(users).map((user, id) => (
            <Dropdown.Item
              key={id}
              style={{
                padding: "10px",
              }}
              onClick={handleSetAuthedUser}
              data-testid={id}
            >
              <Image
                src={user.avatarURL}
                roundedCircle
                style={{
                  width: "5vh",
                  borderStyle: "solid",
                  borderWidth: "2px",
                  borderRadius: "2px",
                  borderColor: "rgb(200, 200, 200)",
                  marginRight: "20px",
                }}
              />
              @{user.id}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

const mapStateToProp = ({ questions, users, authedUser }) => ({
  questions,
  users,
  authedUser,
});

export default connect(mapStateToProp)(Login);

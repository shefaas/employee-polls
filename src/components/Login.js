import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Image } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import { setAuthedUser } from "../actions/authedUser";

const Login = ({ users, dispatch }) => {
  const navigate = useNavigate();

  const handleSetAuthedUser = (event) => {
    console.log(event.target.text.substring(1));
    dispatch(setAuthedUser(event.target.text.substring(1)));
    navigate("/");
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
      <Dropdown>
        <Dropdown.Toggle variant="primary" id="dropdown-basic">
          Select Login User
        </Dropdown.Toggle>

        <Dropdown.Menu
          key="users"
          style={{ padding: "10px", borderStyle: "solid", borderWidth: "1px" }}
        >
          {Object.values(users).map((user, id) => (
            <Dropdown.Item
              key={id}
              style={{
                padding: "10px",
              }}
              onClick={handleSetAuthedUser}
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

const mapStateToProp = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProp)(Login);

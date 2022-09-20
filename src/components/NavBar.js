import { Link } from "react-router-dom";

import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { setAuthedUser } from "../actions/authedUser";

const NavBar = ({ authedUser, dispatch }) => {
  const handleLogout = () => {
    dispatch(setAuthedUser(null));
  };
  return (
    <Nav
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        margin: "20px",
        marginBottom: "50px",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
          textDecoration: "none",
          columnGap: "30px",
          paddingLeft: "5px",
          paddingTop: "5px",
        }}
      >
        <li key="home">
          <Link
            key="home"
            to="/"
            style={{
              textDecoration: "none",
              fontColor: "blue",
            }}
          >
            Home
          </Link>
        </li>
        <li key="leaderboard">
          <Link
            key="leaderboard"
            to="/leaderboard"
            style={{
              textDecoration: "none",
              fontColor: "blue",
            }}
          >
            Leaderboard
          </Link>
        </li>
        <li key="add">
          <Link
            key="add"
            to="/add"
            style={{
              textDecoration: "none",
              fontColor: "blue",
            }}
          >
            New
          </Link>
        </li>
      </div>

      <NavDropdown title={authedUser} id="basic-nav-dropdown" key="users">
        <Link
          to="/login"
          style={{
            textDecoration: "none",
            textAlign: "center",
            paddingLeft: "30px",
          }}
          onClick={handleLogout}
        >
          Logout
        </Link>
      </NavDropdown>
    </Nav>
  );
};

const mapStateToProp = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProp)(NavBar);

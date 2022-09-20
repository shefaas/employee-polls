import { Link } from "react-router-dom";
import { connect } from "react-redux";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const NavBar = ({ users, authedUser }) => {
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
          columnGap: "16px",
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
        {/* <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/leaderboard" href="/leaderboard">
            Leaderboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/add" href="/add">
            New
          </Nav.Link>
        </Nav.Item> */}
      </div>

      <NavDropdown title={authedUser} id="basic-nav-dropdown" key="users">
        {Object.keys(users).map((user, id) => (
          <NavDropdown.Item key={id}>{user}</NavDropdown.Item>
        ))}
        <NavDropdown.Divider key="divider" />
        <NavDropdown.Item href="#action/3.4" key="logout">
          Logout
        </NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

const mapStateToProp = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProp)(NavBar);

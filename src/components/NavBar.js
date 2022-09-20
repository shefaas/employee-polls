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
      activeKey="/home"
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "flex-start",
        }}
      >
        <Nav.Item>
          <Nav.Link href="/">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/leaderboard" href="/leaderboard">
            Leaderboard
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="/new" href="/new">
            New
          </Nav.Link>
        </Nav.Item>
      </div>

      <NavDropdown title={authedUser} id="basic-nav-dropdown">
        {Object.keys(users).map((user) => (
          <NavDropdown.Item href="#action/3.1" key={user.id}>
            {user}
          </NavDropdown.Item>
        ))}
        <NavDropdown.Divider />
        <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
      </NavDropdown>
    </Nav>
  );
};

const mapStateToProp = ({ users, authedUser }) => ({
  users,
  authedUser,
});

export default connect(mapStateToProp)(NavBar);

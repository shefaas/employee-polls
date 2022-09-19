import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="nav">
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/new">New Tweet</Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;

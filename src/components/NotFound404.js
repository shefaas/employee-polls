import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";

const NotFound404 = ({ authedUser }) => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        alignContent: "center",
        height: "70vh",
        rowGap: "50px",
      }}
    >
      <div>
        <h1 style={{ fontSize: "140px" }}>404</h1>
        <h3>Page not found or couldn't be accesses! 🤖</h3>
      </div>
      {authedUser && (
        <Button variant="outline-primary" onClick={() => navigate("/")}>
          Go to Home
        </Button>
      )}
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(NotFound404);

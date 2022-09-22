import { useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useRequireAuth } from "../utils/helper";

const Leaderboard = () => {
  const users = useSelector((state) => state.users);
  const authedUser = useSelector((state) => state.authedUser);

  const navigate = useNavigate();
  useRequireAuth(authedUser, "/leaderboard", navigate);

  const sortedUsers = Object.values(users).sort((userA, userB) => {
    return (
      Object.keys(userB.answers).length +
      userB.questions.length -
      (Object.keys(userA.answers).length + userA.questions.length)
    );
  });

  return (
    <div style={{ margin: "50px" }}>
      <Table bordered hover>
        <thead>
          <tr>
            <th>Users</th>
            <th>Answered</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {sortedUsers.map((user) => (
            <tr key={user.id}>
              <td>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    flexWrap: "wrap",
                    justifyContent: "flex-start",
                    alignContent: "center",
                    alignItems: "center",
                    height: "10vh",
                  }}
                >
                  <Image
                    src={user.avatarURL}
                    roundedCircle
                    style={{
                      width: "8vh",
                      borderStyle: "solid",
                      borderWidth: "1px",
                      borderColor: "rgb(200, 200, 200)",
                      marginRight: "10px",
                      marginLeft: "10px",
                    }}
                  />
                  <div style={{ marginTop: "4px" }}>
                    <p style={{ fontSize: "14px", margin: 0 }}>{user.name}</p>
                    <p style={{ fontSize: "12px" }}>@{user.id}</p>
                  </div>
                </div>
              </td>
              <td>{Object.keys(user.answers).length}</td>
              <td>{user.questions.length}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default Leaderboard;

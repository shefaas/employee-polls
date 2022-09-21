import { useEffect } from "react";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function formatQuestion(question, author) {
  const { id, optionOne, optionTwo, timestamp } = question;
  const { name, avatarURL } = author;

  return {
    name,
    id,
    timestamp,
    optionOne,
    optionTwo,
    avatar: avatarURL,
  };
}

export const useRequireAuth = (authedUser, route, navigate) => {
  useEffect(() => {
    if (!authedUser) {
      navigate("/login", { state: route });
    }
  }, []);
};

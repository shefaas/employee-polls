import { render, screen, fireEvent, getByTestId } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import "@testing-library/jest-dom";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "../reducers";
import thunk from "redux-thunk";
import { applyMiddleware } from "redux";
import App from "../components/App";
import { setAuthedUser } from "../actions/authedUser";
import { handleInitialData } from "../actions/shared";

const store = createStore(reducer, applyMiddleware(thunk));

describe("Main tests from App", () => {
  test("Render App component for unauthorized users (redirect to login)", () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const title = screen.getByText("Employee Polls App 👋");

    expect(title).toBeInTheDocument();

    fireEvent.click(title);
    expect(screen.getByTestId("login-dropdown")).toBeInTheDocument();
  });

  test("Fire event to see login dropdown menu", () => {
    render(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    const title = screen.getByText("Employee Polls App 👋");
    fireEvent.click(title);
    expect(screen.getByTestId("login-dropdown")).toBeInTheDocument();
  });

  it("Matches the snapshot when a parameter is passed", () => {
    expect(
      render(
        <Provider store={store}>
          <Router>
            <App testingValue={"Hello"} />
          </Router>
        </Provider>
      )
    ).toMatchSnapshot();
  });
});

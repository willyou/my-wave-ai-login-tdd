import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import App from "./App";

describe("App", () => {
  const user = userEvent.setup();

  beforeEach(() => {
    render(<App />);
  });
  it("should render App", () => {
    const app = screen.getByTestId("login-app");
    expect(app).toBeInTheDocument();
  });

  it("should render company logo", () => {
    const image = document.querySelector(".company-logo");
    expect(image).toBeInTheDocument();
  });

  it("should hide the login form and show success message after login success", async () => {
    const loginForm = screen.getByTestId("login-form");
    const inputs = {
      email: "hi@tw.com",
      password: "@@Zchu777utn",
    };

    const username = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");

    await user.type(username, inputs.email);
    await user.type(password, inputs.password);

    const loginButton = screen.getByRole("button", { name: "Submit" });
    await user.click(loginButton);

    expect(loginForm).not.toBeInTheDocument();

    const success = `Welcome to MyWAVE.AI`;
    const successMessage = screen.queryByText(success);
    expect(successMessage).toBeInTheDocument();
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();
  beforeEach(() => {
    render(<LoginForm onSubmit={onSubmit} />);
  });

  it("should ensure input values are required.", async () => {
    const emailMessage = "The email is required.";
    const passwordMessage = "The password is required.";
    const confirmMessage = "The confirm password is required.";
    const loginButton = screen.getByRole("button", { name: "Submit" });
    await user.click(loginButton);

    const emailError = screen.queryByText(emailMessage);
    expect(emailError).toBeInTheDocument();

    const passwordError = screen.queryByText(passwordMessage);
    expect(passwordError).toBeInTheDocument();

    const confirmPasswordError = screen.queryByText(confirmMessage);
    expect(confirmPasswordError).toBeInTheDocument();
  });

  it("should initialize an empty form with inputs that are all required", () => {
    const email = screen.queryByPlaceholderText("Email");
    const password = screen.queryByPlaceholderText("Password");
    const confirmPassword = screen.queryByPlaceholderText("Confirm password");

    expect(email).toHaveValue("");
    expect(password).toHaveValue("");
    expect(confirmPassword).toHaveValue("");
  });

  it("should modify input values", async () => {
    const emailValue = "incorrect.email";
    const email = screen.getByPlaceholderText("Email");
    await user.type(email, emailValue);
    expect(email).toHaveValue(emailValue);

    const pwValue = "password";
    const password = screen.getByPlaceholderText("Password");
    await user.type(password, pwValue);
    expect(password).toHaveValue(pwValue);

    const cpwValue = "password";
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    await user.type(confirmPassword, cpwValue);
    expect(confirmPassword).toHaveValue(cpwValue);
  });

  it("should display error message if email format is incorrect", async () => {
    const emailContent = "incorrect.email";
    const email = screen.getByPlaceholderText("Email");
    await user.type(email, emailContent);
    expect(email).toBeInvalid();

    const errorMessage = screen.queryByText("Email format is incorrect.");
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message if password format is incorrect", async () => {
    const message = `must have at least one capital letter, one numeric character, and one special character.`;
    const pwContent = "password";
    const password = screen.getByPlaceholderText("Password");
    expect(password).toBeInTheDocument();
    await user.type(password, pwContent);

    const errorMessage = screen.queryByText(message);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message if password is not equal to confirm password", async () => {
    const message = "The password is inconsistent.";
    const pwContent = "password";
    const password = screen.getByPlaceholderText("Password");
    await user.type(password, pwContent);

    const cpwContent = "password!!";
    const confirmPassword = screen.getByPlaceholderText("Confirm password");
    await user.type(confirmPassword, cpwContent);

    const errorMessage = screen.queryByText(message);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should passing email and password.", async () => {
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

    expect(onSubmit).toHaveBeenCalledWith(inputs);
  });
});

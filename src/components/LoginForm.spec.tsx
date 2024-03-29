import { fireEvent, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  const user = userEvent.setup();
  const onSubmit = vi.fn();

  const requiredMessage = {
    email: "The email is required.",
    password: "The password is required.",
    confirmPassword: "The confirm password is required.",
  };

  const incorrectMessage = {
    email: "Email format is incorrect.",
    password:
      "must have at least one capital letter, one numeric character, and one special character.",
    confirmPassword: "The password is inconsistent.",
  };

  beforeEach(() => {
    render(<LoginForm onSubmit={onSubmit} />);
  });

  it("should ensure input values are required.", async () => {
    const loginButton = screen.getByRole("button", { name: "Submit" });
    await user.click(loginButton);

    const emailError = screen.queryByText(requiredMessage.email);
    expect(emailError).toBeInTheDocument();

    const passwordError = screen.queryByText(requiredMessage.password);
    expect(passwordError).toBeInTheDocument();

    const confirmPasswordError = screen.queryByText(
      requiredMessage.confirmPassword
    );
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
    fireEvent.blur(email);
    const errorMessage = screen.queryByText(incorrectMessage.email);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message if password format is incorrect", async () => {
    const pwContent = "password";
    const password = screen.getByPlaceholderText("Password");
    expect(password).toBeInTheDocument();
    await user.type(password, pwContent);
    fireEvent.blur(password);
    const errorMessage = screen.queryByText(incorrectMessage.password);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should display error message if password is not equal to confirm password", async () => {
    const pwContent = "password";
    const password = screen.getByPlaceholderText("Password");
    await user.type(password, pwContent);
    fireEvent.blur(password);

    const cpwContent = "password!!";
    const confirmPassword = screen.getByPlaceholderText("Confirm password");

    await user.type(confirmPassword, cpwContent);
    fireEvent.blur(confirmPassword);

    const errorMessage = screen.queryByText(incorrectMessage.confirmPassword);
    expect(errorMessage).toBeInTheDocument();
  });

  it("should passing email and password if form is valid.", async () => {
    const inputs = {
      email: "hi@tw.com",
      password: "@@Zchu777utn",
    };

    const username = screen.getByPlaceholderText("Email");
    const password = screen.getByPlaceholderText("Password");
    const confirmPassword = screen.getByPlaceholderText("Confirm password");

    await user.type(username, inputs.email);
    await user.type(password, inputs.password);
    await user.type(confirmPassword, inputs.password);

    const loginButton = screen.getByRole("button", { name: "Submit" });
    await user.click(loginButton);

    expect(onSubmit).toHaveBeenCalledWith(inputs);
  });

  it("should validate email dynamic when email is touched", async () => {
    const email = screen.getByPlaceholderText("Email");
    await userEvent.type(email, "wrong format email");
    fireEvent.blur(email);

    const emailErrorMessage = screen.queryByText(incorrectMessage.email);
    expect(emailErrorMessage).toBeInTheDocument();

    await userEvent.clear(email);
    const errorMessage = screen.queryByText(requiredMessage.email);
    expect(errorMessage).toBeInTheDocument();
  });
});

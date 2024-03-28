import { render, screen } from "@testing-library/react";

import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  beforeEach(() => {
    render(<LoginForm />);
  });

  it("should disabled the submit button at the beginning", () => {
    const loginButton = screen.getByRole("button", { name: "Submit" });
    expect(loginButton).toBeDisabled();
  });

  it("should initialized an empty form", () => {
    const email = screen.queryByPlaceholderText("Email");
    const password = screen.queryByPlaceholderText("Password");
    const confirmPassword = screen.queryByPlaceholderText("Confirm password");

    expect(email).toHaveValue("");
    expect(password).toHaveValue("");
    expect(confirmPassword).toHaveValue("");
  });

  it("should have the correct types for inputs", () => {
    const email = screen.queryByPlaceholderText("Email");
    const password = screen.queryByPlaceholderText("Password");
    const confirmPassword = screen.queryByPlaceholderText("Confirm password");

    expect(email).toHaveAttribute("type", "email");
    expect(password).toHaveAttribute("type", "password");
    expect(confirmPassword).toHaveAttribute("type", "password");
  });

  it("should prevent submit function from being called if invalid", () => {});

  it("should enable submit button if inputs are all valid", () => {});

  it("should display error message for invalid inputs", () => {});
});

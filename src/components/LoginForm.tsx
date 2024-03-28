import { useState } from "react";
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
} from "../utils/validators";

interface onSubmitProps {
  email: string;
  password: string;
}
interface LoginFormProps {
  onSubmit: (props: onSubmitProps) => void;
}

export function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  return (
    <div>
      <form
        data-testid="login-form"
        onSubmit={(e) => {
          e.preventDefault();

          const message = emailValidator(email);
          setEmailError(message);

          const pwError = passwordValidator(password);
          setPasswordError(pwError);

          const cpwError = confirmPasswordValidator(password, confirmPassword);
          setConfirmPasswordError(cpwError);

          if (!message) {
            onSubmit({
              email,
              password,
            });
          }
        }}
      >
        <input
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const email = e.target.value;
            setEmail(e.target.value);

            const message = emailValidator(email);
            setEmailError(message);
          }}
        ></input>
        <span> {emailError}</span>
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => {
            const password = e.target.value;
            setPassword(password);

            const pwError = passwordValidator(password);
            setPasswordError(pwError);
          }}
        ></input>
        <span> {passwordError}</span>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            const confirmPassword = e.target.value;
            setConfirmPassword(e.target.value);
            const cpwError = confirmPasswordValidator(
              password,
              confirmPassword
            );
            setConfirmPasswordError(cpwError);
          }}
        ></input>
        <span>{confirmPasswordError}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

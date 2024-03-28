import { useState } from "react";

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
          const emailRegExp =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

          if (!email) {
            setEmailError("The email is required.");
          } else if (!emailRegExp.test(email)) {
            setEmailError("Email format is incorrect.");
          } else {
            setEmailError("");
          }

          const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;

          if (!password) {
            setPasswordError("The password is required.");
          } else if (!passwordRegExp.test(password)) {
            setPasswordError(
              `must have at least one capital letter, one numeric character, and one special character.`
            );
          } else {
            setPasswordError("");
          }

          if (!confirmPassword) {
            setConfirmPasswordError("The confirm password is required.");
          } else if (password !== confirmPassword) {
            setConfirmPasswordError("The password is inconsistent.");
          } else {
            setConfirmPasswordError("");
          }

          onSubmit({
            email,
            password,
          });
        }}
      >
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => {
            const email = e.target.value;
            setEmail(e.target.value);
            const emailRegExp =
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

            if (!email) {
              setEmailError("The email is required.");
            } else if (!emailRegExp.test(email)) {
              setEmailError("Email format is incorrect.");
            } else {
              setEmailError("");
            }
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
            const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;

            if (!password) {
              setPasswordError("The password is required.");
            } else if (!passwordRegExp.test(password)) {
              setPasswordError(
                `must have at least one capital letter, one numeric character, and one special character.`
              );
            } else {
              setPasswordError("");
            }
          }}
        ></input>
        <span> {passwordError}</span>
        <input
          type="password"
          placeholder="Confirm password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            const confirmPassword = e.target.value;
            if (!confirmPassword) {
              setConfirmPasswordError("The confirm password is required.");
            } else if (password !== confirmPassword) {
              setConfirmPasswordError("The password is inconsistent.");
            } else {
              setConfirmPasswordError("");
            }
          }}
        ></input>
        <span>{confirmPasswordError}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

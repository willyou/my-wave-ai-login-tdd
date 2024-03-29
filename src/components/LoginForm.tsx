import { useState } from "react";
import {
  confirmPasswordValidator,
  emailValidator,
  passwordValidator,
  validateForm,
} from "../utils/validators";
import { SignUpFormData, SignUpFormDataError } from "../types";

interface onSubmitProps {
  email: string;
  password: string;
}

interface LoginFormProps {
  onSubmit: (props: onSubmitProps) => void;
}

export function LoginForm(props: LoginFormProps) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formError, setFormError] = useState<SignUpFormDataError>({
    email: {
      touched: false,
      error: false,
      message: "",
    },
    password: {
      touched: false,
      error: false,
      message: "",
    },
    confirmPassword: { touched: false, error: false, message: "" },
  });

  const onUpdateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const nextFormState = {
      ...formData,
      [name]: value,
    };
    setFormData(nextFormState);
  };

  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");
  const [confirmPasswordError, setConfirmPasswordError] = useState<string>("");

  return (
    <div>
      <form
        data-testid="login-form"
        onSubmit={(e) => {
          e.preventDefault();

          const message = emailValidator(formData.email);
          setEmailError(message);

          const pwError = passwordValidator(formData.password);
          setPasswordError(pwError);

          const cpwError = confirmPasswordValidator(
            formData.password,
            formData.confirmPassword
          );
          setConfirmPasswordError(cpwError);

          if (!message) {
            onSubmit({
              email: formData.email,
              password: formData.password,
            });
          }
        }}
      >
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            const { name, value } = e.target;
            onUpdateField(e);

            const message = emailValidator(value);
            setEmailError(message);
          }}
        ></input>
        <span> {emailError}</span>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            const { name, value } = e.target;
            onUpdateField(e);
            const pwError = passwordValidator(value);
            setPasswordError(pwError);
          }}
        ></input>
        <span> {passwordError}</span>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) => {
            const { name, value } = e.target;
            onUpdateField(e);

            const cpwError = confirmPasswordValidator(formData.password, value);
            setConfirmPasswordError(cpwError);
          }}
        ></input>
        <span>{confirmPasswordError}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

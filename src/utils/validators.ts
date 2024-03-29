import {
  SignUpFormData,
  SignUpFormDataError,
  ValidateFormProps,
} from "../types";

export const emailValidator = (email: string): string => {
  const emailRegExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

  if (!email) {
    return "The email is required.";
  } else if (!emailRegExp.test(email)) {
    return "Email format is incorrect.";
  }
  return "";
};

export const passwordValidator = (password: string): string => {
  const passwordRegExp = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/;

  if (!password) {
    return "The password is required.";
  } else if (!passwordRegExp.test(password)) {
    return `must have at least one capital letter, one numeric character, and one special character.`;
  }
  return "";
};

export const confirmPasswordValidator = (
  password: string,
  confirmPassword: string
): string => {
  if (!password) {
    return "The confirm password is required.";
  } else if (password !== confirmPassword) {
    return "The password is inconsistent.";
  }
  return "";
};

export const validateForm = (props: ValidateFormProps) => {
  let isValid = true;

  // Create a deep copy of the errors
  const { form, field, errorsState } = props;
  const nextErrors: SignUpFormDataError = JSON.parse(
    JSON.stringify(errorsState)
  );

  // Force validate all the fields
  // if (forceTouchErrors) {
  //   nextErrors = touchErrors(errors);
  // }

  const { email, password, confirmPassword } = form;

  if (nextErrors.email.touched && field === "email") {
    const emailMessage = emailValidator(email);
    nextErrors.email.error = !!emailMessage;
    nextErrors.email.message = emailMessage;
    if (!!emailMessage) isValid = false;
  }

  if (nextErrors.password.touched && (field ? field === "password" : true)) {
    const passwordMessage = passwordValidator(password);
    nextErrors.password.error = !!passwordMessage;
    nextErrors.password.message = passwordMessage;
    if (!!passwordMessage) isValid = false;
  }

  if (nextErrors.confirmPassword.touched && field === "confirmPassword") {
    const confirmPasswordMessage = confirmPasswordValidator(
      password,
      confirmPassword
    );
    nextErrors.confirmPassword.error = !!confirmPasswordMessage;
    nextErrors.confirmPassword.message = confirmPasswordMessage;
    if (!!confirmPasswordMessage) isValid = false;
  }

  return {
    isValid,
    errors: nextErrors,
  };
};

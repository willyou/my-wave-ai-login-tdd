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

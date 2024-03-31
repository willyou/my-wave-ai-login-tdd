import { AuthData, SignUpResponse } from "../types";

export const LoginAPI = {
  login: (authData: AuthData) => {
    const promise: Promise<SignUpResponse> = new Promise((resolve, _) => {
      setTimeout(() => {
        resolve({
          success: true,
          message: "Login success!",
        });
      }, 1000);
    });
    return promise;
  },
};

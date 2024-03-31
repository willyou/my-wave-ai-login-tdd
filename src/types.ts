export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface AuthData {
  email: string;
  password: string;
}

export interface ValidateFormProps {
  form: SignUpFormData;
}

export interface SignUpFormDataError {
  email: ErrorState;
  password: ErrorState;
  confirmPassword: ErrorState;
}

export interface ErrorState {
  error: boolean;
  message: string;
}

export type SignUpResponse = {
  success: boolean;
  message: string;
};

export interface TouchedState {
  email: boolean;
  password: boolean;
  confirmPassword: boolean;
}

export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ValidateFormProps {
  form: SignUpFormData;
  field: string;
  errorsState: SignUpFormDataError;
}

export interface SignUpFormDataError {
  email: ErrorState;
  password: ErrorState;
  confirmPassword: ErrorState;
}

export interface ErrorState {
  touched: boolean;
  error: boolean;
  message: string;
}

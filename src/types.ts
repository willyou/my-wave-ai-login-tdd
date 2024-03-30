export interface SignUpFormData {
  email: string;
  password: string;
  confirmPassword: string;
  focusOn: string;
}

export interface ValidateFormProps {
  form: SignUpFormData;
  fields: string[];
  forceTouched?: boolean;
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

export type SignUpResponse = {
  success: boolean;
  message: string;
};

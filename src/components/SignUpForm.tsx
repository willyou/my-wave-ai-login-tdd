import { useEffect, useState } from "react";
import { validateForm } from "../utils/validators";
import { SignUpFormData, SignUpFormDataError } from "../types";

interface onSubmitProps {
  email: string;
  password: string;
}

interface SignUpFormProps {
  onSubmit: (props: onSubmitProps) => void;
}

export function SignUpForm(props: SignUpFormProps) {
  const { onSubmit } = props;
  const [formData, setFormData] = useState<SignUpFormData>({
    email: "",
    password: "",
    confirmPassword: "",
    focusOn: "",
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
      ...{
        [name]: value,
        focusOn: name,
      },
    };
    setFormData(nextFormState);
  };

  useEffect(() => {
    const { errors } = validateForm({
      form: formData,
      fields: [formData.focusOn],
      errorsState: formError,
    });

    setFormError(errors);
  }, [formData]);

  return (
    <div>
      <form
        data-testid="login-form"
        onSubmit={(e) => {
          e.preventDefault();

          const { isValid, errors } = validateForm({
            form: formData,
            fields: ["email", "password", "confirmPassword"],
            errorsState: formError,
            forceTouched: true,
          });

          if (isValid) {
            onSubmit({
              email: formData.email,
              password: formData.password,
            });
          } else {
            setFormError(errors);
          }
        }}
      >
        <input
          name="email"
          type="text"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => {
            onUpdateField(e);
          }}
          onBlur={(e) => {
            const { name, value } = e.target;

            if (formError.email.touched) return;

            const updatedErrors = {
              ...formError,
              [name]: {
                ...formError.email,
                touched: true,
              },
            };

            const { isValid, errors } = validateForm({
              form: formData,
              fields: [name],
              errorsState: updatedErrors,
            });

            setFormError(errors);
          }}
        ></input>
        <span> {formError.email.message}</span>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={(e) => {
            onUpdateField(e);
          }}
          onBlur={(e) => {
            const { name, value } = e.target;

            if (formError.password.touched) return;

            const updatedErrors = {
              ...formError,
              [name]: {
                ...formError.email,
                touched: true,
              },
            };

            const { isValid, errors } = validateForm({
              form: formData,
              fields: [name],
              errorsState: updatedErrors,
            });

            setFormError(errors);
          }}
        ></input>
        <span> {formError.password.message}</span>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={(e) => {
            onUpdateField(e);
          }}
          onBlur={(e) => {
            const { name, value } = e.target;

            if (formError.confirmPassword.touched) return;

            const updatedErrors = {
              ...formError,
              [name]: {
                ...formError.email,
                touched: true,
              },
            };

            const { isValid, errors } = validateForm({
              form: formData,
              fields: [name],
              errorsState: updatedErrors,
            });

            setFormError(errors);
          }}
        ></input>
        <span>{formError.confirmPassword.message}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

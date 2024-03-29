import { useState } from "react";
import { validateForm } from "../utils/validators";
import { SignUpFormData } from "../types";
import { useFormValidator } from "../hooks/useFormValidator";

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

  const { formError, onBlurField, setFormError } = useFormValidator(formData);

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
          onChange={onUpdateField}
          onBlur={onBlurField}
        ></input>
        <span> {formError.email.message}</span>
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={onUpdateField}
          onBlur={onBlurField}
        ></input>
        <span> {formError.password.message}</span>
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm password"
          value={formData.confirmPassword}
          onChange={onUpdateField}
          onBlur={onBlurField}
        ></input>
        <span>{formError.confirmPassword.message}</span>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
